import React from "react";
import { Route, Routes } from "react-router-dom";

import Header from "../GlobalComponents/header";
import Protected from './Protected';
import Login from "../pages/Login";
import NoPage from "../pages/NoPage";
import CadastroEmpresa from "../pages/CadastrarEmpresa";
import SubHeader from "../GlobalComponents/SubHeader";

export default function Rotas(){


    return (
        <>
            <Header></Header>
                <Routes>
                    <Route path="/" index element={
                        //para poder acessar a página de cadastrar empresa sem logar, só trocar de true para false
                        <Protected component={CadastroEmpresa} isClosed={true}>
                            <SubHeader></SubHeader>
                            <CadastroEmpresa></CadastroEmpresa>
                        </Protected>
                    }/>
                    <Route path="/Login" element={<Login></Login>}/>
                    <Route path="*" element={<NoPage/>}/>
                </Routes>
        </>
    );
};
