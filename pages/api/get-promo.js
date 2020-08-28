import { GoogleSpreadsheet } from "google-spreadsheet";
import credentials from "../../credentials.json";

const doc = new GoogleSpreadsheet(
  "165CkhXZTFRNySdP84sMgu-w5UcCi3mCsmEZOPkrtXDs"
);

export default async (req, res) => {
  try {
    await doc.useServiceAccountAuth(credentials);
    await doc.loadInfo();

    const sheet = doc.sheetsByIndex[2];
    await sheet.loadCells("A2:B2");

    const showPromoteCell = sheet.getCell(1, 0);
    const textCell = sheet.getCell(1, 1);

    res.end(
      JSON.stringify({
        showCoupon: showPromoteCell.value === "VERDADEIRO",
        message: textCell.value,
      })
    );
  } catch (err) {
    console.log(err);
  }
};
