import React from "react";

import { Form, ContainerEmpresa, ButtonAcordion, Legend, InputMask as ReactInputMask, DivLinha, DivColuna } from "./styled";
import { Painel } from "./styled";
import { FaPlus, FaWindowMinimize } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../store/modules/empresareducer/actions';
import UploadPhoto from "../../../GlobalComponents/UploadPhoto";

export default function EditarEmpresa({empresa = {}, close = () => {}}){

    const [departamento, setDepartamento] = React.useState(empresa.departamento ?? "");
    const [nome, setNome] = React.useState(empresa.nome ?? "");
    const [email, setEmail] = React.useState(empresa.email ?? "");
    const [telefone, setTelefone] = React.useState(empresa.telefone ?? "");
    const [endereco, setEndereco] = React.useState(empresa.endereco ?? "");
    const [bairro, setBairro] = React.useState(empresa.bairro ?? "");
    const [cnpj, setCNPJ] = React.useState(empresa.cnpj);
    const [numero, setNumero] = React.useState(empresa.numero ?? 0);
    const [cep, setCep] = React.useState(empresa.cep);
    const [foto, setFoto] = React.useState(false);

    const [isOpen1, setIsOpen1] = React.useState(false);
    const [isOpen2, setIsOpen2] = React.useState(false);
    const [isOpen3, setIsOpen3] = React.useState(false);


    const dispatch = useDispatch();
    const user = useSelector(state => state.authreducer);

    function handleSubmit(e){
        e.preventDefault();

        let originalname = foto.name;
        let filename = Date.now() + "_" + user.user.id + "_" + originalname;
        let id_dono = user.user.id;
        let id_empresa_dona = user.user.id_empresa;
        let mime_type = foto.type;
        let dados = {originalname: originalname, filename: filename, id_dono: id_dono, id_empresa_dona:id_empresa_dona, mime_type: mime_type, file: foto};
        if(foto){
            dispatch(actions.EMPRESA_EDITAR_COM_FOTO({departamento: departamento, 
                nome: nome, 
                email: email, 
                telefone: telefone, 
                endereco: `${endereco}`, 
                numero: `${numero}`, 
                bairro: `${bairro}`, 
                cep: `${String(cep).replace(/\D/g, "")}`, 
                cnpj: cnpj,
                id: empresa.id,
                photo: dados}));
        }else{
            dispatch(actions.EMPRESA_EDITARREQUEST({departamento: departamento, 
                nome: nome, 
                email: email, 
                telefone: telefone, 
                endereco: `${endereco}`, 
                numero: `${numero}`, 
                bairro: `${bairro}`, 
                cep: `${String(cep).replace(/\D/g, "")}`, 
                cnpj: cnpj,
                id_empresa: empresa.id_empresa,
                id: empresa.id}));
        }

        close();
        
    }

    return (
            <ContainerEmpresa>
                <Form onSubmit={(e) => handleSubmit(e)}>
                    <Legend>
                        <p>Editar</p>  
                    </Legend>
                    <UploadPhoto setImg={setFoto} filter={'id+eq+'+empresa.id_foto}></UploadPhoto>
                    <ButtonAcordion type="button" className="accordion" onClick={(e) => setIsOpen1(!isOpen1)}>Dados do Empresa {isOpen1 ? <FaWindowMinimize/>: <FaPlus/>}</ButtonAcordion>
                    {isOpen1 ? <Painel isOpen={isOpen1}>
                        <DivColuna>
                                <DivLinha>                                    
                                    <div className="element">
                                        <label className="globalLab">Nome: </label>
                                        <ReactInputMask id="labsNomeF" className="nomeF" type="text" placeholder="Digite o nome" value={nome} onChange={(e) => setNome(e.target.value)} ></ReactInputMask>
                                    </div>
                                    <div className="element">
                                        <label className="globalLab">Departamento: </label>
                                        <ReactInputMask id="labdepartamento" className="razaoS" type="text" placeholder="Digite o departamento" value={departamento} onChange={(e) => setDepartamento(e.target.value)} ></ReactInputMask>
                                    </div>
                                </DivLinha>

                                <DivLinha>
                                    <div className="element">
                                        <label className="globalLab">CNPJ: </label>
                                        <ReactInputMask id="labsCnpj" mask="99.999.999/9999-99" maskchar="_" className="labCnpj" type="text" placeholder="00.000.000/0000-00" value={cnpj} onChange={(e) => setCNPJ(e.target.value)} ></ReactInputMask>
                                    </div>
                                    <div className="element">
                                        <label className="globalLab">Telefone: </label>
                                        <ReactInputMask id="labsTel" mask="(99) 99999-9999" maskchar="_" className="labTel" type="text" placeholder="(00) 00000-0000" value={telefone} onChange={(e) => setTelefone(e.target.value)}  />
                                    </div>

                                </DivLinha>
                        </DivColuna>
                    </Painel>: null}
                    
                    <ButtonAcordion type="button" className="accordion" onClick={(e) => setIsOpen2(!isOpen2)}>Endereço {isOpen2 ? <FaWindowMinimize/>: <FaPlus/>}</ButtonAcordion>
                    {isOpen2 ? <Painel isOpen={isOpen2}>
                        <div className="dadosEnd">
                            <div id="cep">
                                <label className="globalLab">CEP:</label>
                                <ReactInputMask id="labsCep" mask="99999-999" maskchar="_" className="labCep" type="text" placeholder="00000-000" value={cep} onChange={(e) => setCep(e.target.value)} />
                                <i id="pesquisa" className="fa fa-search" ></i>
                            </div>
                            <div>
                                <label id="endereco" className="globalLab">Endereço:</label>
                                <ReactInputMask id="respNEnd" className="labrespNEnd" type="text" placeholder="Endereço" value={endereco} onChange={ (e)=> setEndereco(e.target.value)}/>
                                <label id="respEnd" className="globalLab">Bairro</label>
                                <ReactInputMask id="respNBairro" className="labrespNEnd" type="text" placeholder="Bairro" value={bairro} onChange={ (e)=> setBairro(e.target.value)} />
                                <label id="nEnd" className="globalLab">Número do Logradouro:</label>
                                <ReactInputMask id="respNNumero" className="labrespNEnd" type="text" placeholder="Número do Logradouro" value={numero} onChange={(e) => setNumero(e.target.value)} />
                            </div>
                        </div>
                    </Painel>: null}
                    
                    <ButtonAcordion type="button" className="accordion" onClick={(e) => setIsOpen3(!isOpen3)}>Dados de login {isOpen3 ? <FaWindowMinimize/>: <FaPlus/>}</ButtonAcordion>
                    {isOpen3 ? <Painel isOpen={isOpen3}>
                        
                                <label className="globalLab">E-mail: </label>
                                <ReactInputMask id="labsEmail" className="labEmail" type="text" placeholder="Digite o seu e-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
 
                    </Painel>: null}

                    <button type="submit" id="submit" name="submit">Editar</button>
                </Form>
            </ContainerEmpresa>
    );
}

