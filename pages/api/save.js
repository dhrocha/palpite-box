import { GoogleSpreadsheet } from "google-spreadsheet";
import credentials from "../../credentials.json";
import moment from "moment";

const doc = new GoogleSpreadsheet(
  "165CkhXZTFRNySdP84sMgu-w5UcCi3mCsmEZOPkrtXDs"
);

export default async (req, res) => {
  try {
    await doc.useServiceAccountAuth(credentials);
    await doc.loadInfo();

    const sheet = doc.sheetsByIndex[1];

    const data = JSON.parse(req.body);

    const sheetConfig = doc.sheetsByIndex[2];
    await sheetConfig.loadCells("A2:B2");

    const showPromoteCell = sheetConfig.getCell(1, 0);
    const textCell = sheetConfig.getCell(1, 1);

    let cupom;
    let promo;

    const genCoupon = () => {
      const code = parseInt(moment().format("YYMMDDHHmmssSSS"))
        .toString(16)
        .toUpperCase();
      return (
        code.substr(0, 4) + "-" + code.substr(4, 4) + "-" + code.substr(8, 4)
      );
    };

    if (showPromoteCell.value === "VERDADEIRO") {
      cupom = genCoupon();
      promo = textCell.value;
    }

    let dataFill = moment().format("DD/MM/YYYY hh:mm:ss");

    //name	email	whatsapp	cupom	promo
    await sheet.addRow({
      ...data,
      cupom,
      promo,
      dataFill,
    });

    res.end(
      JSON.stringify({
        showCoupon: cupom !== "",
        cupom,
        promo,
      })
    );
  } catch (err) {
    console.log(err);
  }
};