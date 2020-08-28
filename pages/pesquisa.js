import React, { useState } from "react";
import PageTitle from "../components/PageTitle";

const Pesquisa = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    whatsapp: "",
    rating: 5,
  });

  const ratings = [0, 1, 2, 3, 4, 5];

  const [success, setSuccess] = useState(false);
  const [retorno, setRetorno] = useState({});
  const save = async () => {
    try {
      const response = await fetch("api/save", {
        method: "POST",
        body: JSON.stringify(form),
      });
      const data = await response.json();
      setSuccess(true);
      setRetorno(data);
    } catch (err) {
      console.log(err);
    }
  };

  const onChange = (evt) => {
    const value = evt.target.value;
    const key = evt.target.name;
    setForm((old) => ({
      ...old,
      [key]: value,
    }));
  };

  return (
    <div>
      <PageTitle title="Pesquisa" />
      <div className="pt-6">
        <h1 className="text-center font-bold my-4 text-2xl">
          Criticas e Sugestões
        </h1>
        <p className="mb-6 text-center">
          O restaurante X sempre busca por atender melhor seus clientes. <br />
          Por isso, estamos sempre abertos a ouvir sua opinião.
        </p>

        {!success && (
          <div className="w-1/5 mx-auto">
            <label className="font-bold">Seu nome:</label>
            <input
              type="text"
              className="p-4 block shadow bg-blue-100 my-2 rounded-lg"
              onChange={onChange}
              name="name"
              value={form.name}
            />

            <label className="font-bold">Seu email:</label>
            <input
              type="text"
              className="p-4 block shadow bg-blue-100 my-2 rounded-lg"
              onChange={onChange}
              name="email"
              value={form.email}
            />

            <label className="font-bold">Seu whatsapp:</label>
            <input
              type="text"
              className="p-4 block shadow bg-blue-100 my-2 rounded-lg"
              onChange={onChange}
              name="whatsapp"
              value={form.whatsapp}
            />
            <div className="flex py-6">
              {ratings.map((rating) => {
                return (
                  <label className="block w-1/6">
                    {rating}
                    <br />
                    <input
                      type="radio"
                      name="rating"
                      value={rating}
                      onChange={onChange}
                      key={rating}
                    />
                  </label>
                );
              })}
            </div>

            <button
              className="bg-blue-400 py-12 px-4 font-bold rounded-lg shadow-lg hover:shadow"
              onClick={save}
            >
              Salvar
            </button>
          </div>
        )}

        {success && (
          <div className="w-1/5 mx-auto">
            <p className="mb-6 text-center bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3">
              Obrigado por contribuir com sua sugestão ou critica
            </p>
            {retorno.showCoupon && (
              <div className="text-center border p-4 mb-4">
                Seu cupom: <br />
                <span className="font-bold text-2xl">{retorno.cupom}</span>
              </div>
            )}
            {retorno.showCoupon && (
              <div className="text-center border p-4 mb-4">
                <span className="font-bold mb-4">{retorno.promo}</span>
                <br /> <hr />
                Tire um print ou foto desta desta tela e mostre ao garçom.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Pesquisa;
