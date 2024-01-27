"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import lstWood from "./typeofwood.json";
import lstArticle from "./typeofarticle.json";
import { m1 } from "@/app/calculationMethods/m1";
import { m2 } from "@/app/calculationMethods/m2";
import { useState } from "react";
import * as yup from "yup";

const validationSchema = yup.object({
  dim1: yup.number().integer().required(),
  dim2: yup.number().integer().required(),
  dim3: yup.number().integer().required(),
});

export default function Home() {
  const namesOfWoods = Object.values(lstWood).map((woodInfo) => woodInfo[0]);
  const namesOfCategory = Object.values(lstArticle).map(
    (catInfo) => catInfo.name
  );

  const [descriptif, setDescriptif] = useState("Texte de description");
  const [prix, setPrix] = useState(0);
  const [quantite, setQuantite] = useState(0);
  const [selected, setSelected] = useState(0);
  const [dim1, setDim1] = useState("Dimension 1");
  const [dim2, setDim2] = useState("Dimension 2");
  const [dim3, setDim3] = useState("Dimension 3");

  const initialValues = {
    typeWoodSelected: namesOfWoods[0],
    typeCatSelected: namesOfCategory[0],
    dim1: 0,
    dim2: 0,
    dim3: 0,
  };

  const renderCat = () => {
    const lstCat = [];
    for (const idarticle in lstArticle) {
      lstCat.push(
        <option value={`${idarticle}`} key={`${idarticle}`}>
          {lstArticle[idarticle].name}
        </option>
      );
    }
    return lstCat;
  };

  const renderWood = () => {
    const options = [];

    for (const idWood in lstWood) {
      options.push(
        <option value={idWood} key={idWood}>
          {lstWood[idWood][0]}
        </option>
      );
    }

    return options;
  };

  const handleSubmit = ({ typeWoodSelected, dim1, dim2, dim3 }) => {
    const typeCatSelected = selected;
    const bois = lstWood[typeWoodSelected][0];
    const prixBois = lstWood[typeWoodSelected][1];
    const typeCalcul = lstArticle[typeCatSelected].reglecalcul;
    let dimension = 0;
    if (typeCalcul == "1") {
      dimension = m1(dim1, dim2);
    } else if (typeCalcul == "2") {
      dimension = m2(dim1, dim2, dim3);
    }
    const prixtotal = dimension * prixBois;

    console.log(typeWoodSelected, typeCatSelected);
    console.log(typeCalcul);
    const textDesc = lstArticle[typeCatSelected].texte;
    const text1 = textDesc.replace("*BOIS*", bois);
    const text2 = text1.replace("*Dimensions*", dimension.toString());

    console.log(textDesc);

    setDescriptif(text2);
    setPrix(prixtotal);
    setQuantite(dimension);
  };

  const updDim = (event) => {
    const selectedCatId = event.target.value;
    console.log(selectedCatId);
    setSelected(selectedCatId);
    const texte = lstArticle[selectedCatId].mesures;
    const lstdim = texte.split(",");
    setDim1(lstdim[0]);
    setDim2(lstdim[1]);
    setDim3(lstdim[2]);
  };

  return (
    <>
      <header>
        <h1 className="text-5xl bg-amber-800 text-white p-4 mb-10">
          Gestion de commande de bois 🪵
        </h1>
      </header>
      <main className="p-7 flex gap-16 grid-flow-row mb-16">
        <div>
          <h2 className="text-3xl text-amber-800 mb-3">Commande</h2>
          <Formik
            onSubmit={handleSubmit}
            initialValues={initialValues}
            validationSchema={validationSchema}
          >
            <Form className="flex flex-col">
              <Field
                name="typeWoodSelected"
                as="select"
                className="border-2 border-amber-800 px-4 py-2 my-1 bg-white"
              >
                {renderWood()}
              </Field>
              <div className="flex items-center">
                <p className="w-2/3">{dim1}</p>
                <Field
                  name="dim1"
                  placeholder="Dimension 1"
                  className="border-2 border-amber-800 px-4 py-2 my-1 w-1/3"
                ></Field>
              </div>
              <div className="flex items-center">
                <p className="w-2/3">{dim2}</p>
                <Field
                  name="dim2"
                  placeholder="Dimension 2"
                  className="border-2 border-amber-800 px-4 py-2 my-1 w-1/3"
                ></Field>
              </div>
              <div className="flex items-center">
                <p className="w-2/3">{dim3}</p>
                <Field
                  name="dim3"
                  placeholder="Dimension 3"
                  className="border-2 border-amber-800 px-4 py-2 my-1 w-1/3"
                ></Field>
              </div>

              <Field
                name="typeCatSelected"
                as="select"
                className="border-2 border-amber-800 px-4 py-2 my-1 bg-white"
                onChange={updDim}
                value={selected}
              >
                {renderCat()}
              </Field>
              <button
                type="submit"
                className="bg-amber-800 text-white hover:bg-amber-900 py-2 mt-2"
              >
                ACHETER
              </button>
            </Form>
          </Formik>
        </div>
        <div>
          <h2 className="text-3xl text-amber-800 mb-3">Récapitulatif</h2>
          <div>
            <p className="mb-1">Descriptif :</p>
            <p className="border-2 border-amber-800 px-4 py-2 mb-3">
              {descriptif}
            </p>
            <p className="mb-1">Prix :</p>
            <p className="border-2 border-amber-800 px-4 py-2  mb-3">{prix}€</p>
            <p className="mb-1">Quantité de bois (m2) :</p>
            <p className="border-2 border-amber-800 px-4 py-2  mb-3">
              {quantite} m2
            </p>
          </div>
        </div>
      </main>
      <footer>
        <p className="bg-amber-800 text-white p-4 italic">
          <a href="https://www.linkedin.com/in/léaschmitt/" target="_blank">
            Léa Schmitt
          </a>{" "}
          © Janvier 2024
        </p>
      </footer>
    </>
  );
}
