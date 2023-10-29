import React, { useEffect } from "react";

import './main.css'
import { Painel, Form, Container, ButtonAcordion, Legend, InputMask as ReactInputMask, DivLinha, DivColuna, DivBotoesEmpresasNavegacao, EmpresaItem } from "./styles";
import { FaPlus, FaTrash, FaUserEdit, FaWindowMinimize } from "react-icons/fa";
import { AiOutlineSearch, AiOutlineUserAdd } from "react-icons/ai";

import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/modules/empresareducer/actions';
import { Loguot, USUARIO_BUSCARREQUEST } from "../../store/modules/authReducer/actions";

import { toast } from 'react-toastify';
import UploadPhoto from "../../GlobalComponents/UploadPhoto";
import EditarEmpresa from './components/EditarEmpresa';

export default function CadastroEmpresa(){

    const [departamento, setDepartamento] = React.useState("");
    const [nome, setNome] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [telefone, setTelefone] = React.useState("");
    const [endereco, setEndereco] = React.useState("");
    const [bairro, setBairro] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmpassword, setConfirmpassword] = React.useState("");
    const [cnpj, setCNPJ] = React.useState("");
    const [numero, setNumero] = React.useState("");
    const [cep, setCep] = React.useState("");
    const [pesquisar, setPesquisar] = React.useState("");

    const [isOpen1, setIsOpen1] = React.useState(false);
    const [isOpen2, setIsOpen2] = React.useState(false);
    const [isOpen3, setIsOpen3] = React.useState(false);

    const [foto, setFoto] = React.useState(false);
    const user = useSelector(state => state.authreducer);
    const [mostrar, setMostrar] = React.useState("cad");
    const [empresaSelecionado, setEmpresaSelecionado] = React.useState({});
    const dispatch = useDispatch();
    const empresas = useSelector(state => {
        try{
            console.log(state)
            return state.empresareducer.empresas.result
        }catch(err){
            return []
        }
    }) ?? [];
    const usuarios = useSelector(state => {
        try{
            return state.authreducer.usuarios.result
        }catch(err){
            return []
        }
    }) ?? [];

    function handleSubmit(e){
        e.preventDefault();

        if(password !== confirmpassword){
            toast.error("Senhas não conferem")
            return;
        }

        let originalname = foto.name;
        let filename = Date.now() + "_" + user.user.id + "_" + originalname;
        let id_dono = user.user.id;
        let mime_type = foto.type;
        let dados = {originalname: originalname, filename: filename, id_dono: id_dono, mime_type: mime_type, file: foto};
        if(foto){
            dispatch(actions.EMPRESA_CRIAR_COM_FOTO({departamento: departamento, 
                nome: nome, 
                email: email, 
                telefone: telefone, 
                endereco: `${endereco}`, 
                numero: `${numero}`, 
                bairro: `${bairro}`, 
                cep: `${String(cep).replace(/\D/g, "")}`, 
                cnpj: cnpj,
                password: password,
                photo: dados}));
        }else{
            dispatch(actions.EMPRESAREQUEST({departamento: departamento, 
                nome: nome, 
                email: email, 
                telefone: telefone, 
                endereco: `${endereco}`, 
                numero: `${numero}`, 
                bairro: `${bairro}`, 
                cep: `${String(cep).replace(/\D/g, "")}`, 
                cnpj: cnpj,
                password: password}));
        }

        setMostrar('list');      
        setDepartamento("");
        setNome("");
        setEmail("");
        setTelefone("");
        setEndereco("");
        setPassword("");
        setBairro("");
        setConfirmpassword("");
        setNumero("");
        setCNPJ("");
        setCep("");
    }

    useEffect(() => {
        dispatch(actions.EMPRESA_BUSCARREQUEST());
        dispatch(USUARIO_BUSCARREQUEST());
    }, [])

    return (
       <>
            <div className="divContainerPrincipal">
                <DivBotoesEmpresasNavegacao>
                    <AiOutlineSearch size={30} style={{margin: 10}} cursor={'pointer'} onClick={() => setMostrar("search")}></AiOutlineSearch>
                    <FaUserEdit size={30} style={{margin: 10}} cursor={'pointer'} onClick={() => setMostrar("list")}></FaUserEdit>
                    <AiOutlineUserAdd size={30} style={{margin: 10}} cursor={'pointer'} onClick={() => setMostrar("cad")}></AiOutlineUserAdd>
                </DivBotoesEmpresasNavegacao>
                {mostrar.match('cad') ?
                    <Container>

                    <Form onSubmit={(e) => handleSubmit(e)}>
                        <Legend>
                            <p>Cadastro de Empresa</p>  
                        </Legend>
                        <UploadPhoto setImg={setFoto}></UploadPhoto>
                        <ButtonAcordion type="button" className="accordion" onClick={(e) => setIsOpen1(!isOpen1)}>Dados do Empresa {isOpen1 ? <FaWindowMinimize/>: <FaPlus/>}</ButtonAcordion>
                        {isOpen1 ? <Painel isOpen={isOpen1}>
                            <DivColuna>
                                    <DivLinha>                                    
                                        <div className="element">
                                            <label className="globalLab">Nome: </label>
                                            <ReactInputMask id="labsNomeF" className="nomeF" type="text" placeholder="Digite o nome" value={nome} onChange={(e) => setNome(e.target.value)} required></ReactInputMask>
                                        </div>
                                        <div className="element">
                                            <label className="globalLab">Departamento: </label>
                                            <ReactInputMask id="labdepartamento" className="razaoS" type="text" placeholder="Digite o departamento" value={departamento} onChange={(e) => setDepartamento(e.target.value)} required></ReactInputMask>
                                        </div>
                                    </DivLinha>

                                    <DivLinha>
                                        <div className="element">
                                            <label className="globalLab">CNPJ: </label>
                                            <ReactInputMask id="labsCnpj" mask="99.999.999/9999-99" maskchar="_" className="labCnpj" type="text" placeholder="00.000.000/0000-00" value={cnpj} onChange={(e) => setCNPJ(e.target.value)} ></ReactInputMask>
                                        </div>
                                        <div className="element">
                                            <label className="globalLab">Telefone: </label>
                                            <ReactInputMask id="labsTel" mask="(99) 99999-9999" maskchar="_" className="labTel" type="text" placeholder="(00) 00000-0000" value={telefone} onChange={(e) => setTelefone(e.target.value)} required />
                                        </div>

                                    </DivLinha>
                            </DivColuna>
                        </Painel>: null}
                        
                        <ButtonAcordion type="button" className="accordion" onClick={(e) => setIsOpen2(!isOpen2)}>Endereço {isOpen2 ? <FaWindowMinimize/>: <FaPlus/>}</ButtonAcordion>
                        {isOpen2 ? <Painel isOpen={isOpen2}>
                            <div className="dadosEnd">
                                <div id="cep">
                                    <label className="globalLab">CEP:</label>
                                    <ReactInputMask id="labsCep" mask="99999-999" maskchar="_" className="labCep" type="text" placeholder="00000-000" value={cep} onChange={(e) => setCep(e.target.value)} required/>
                                    <i id="pesquisa" className="fa fa-search" ></i>
                                </div>
                                <div>
                                    <label id="endereco" className="globalLab">Endereço:</label>
                                    <ReactInputMask id="respNEnd" className="labrespNEnd" type="text" placeholder="Endereço" value={endereco} onChange={ (e)=> setEndereco(e.target.value)}required/>
                                    <label id="respEnd" className="globalLab">Bairro</label>
                                    <ReactInputMask id="respNBairro" className="labrespNEnd" type="text" placeholder="Bairro" value={bairro} onChange={ (e)=> setBairro(e.target.value)} required/>
                                    <label id="nEnd" className="globalLab">Número do Logradouro:</label>
                                    <ReactInputMask id="respNNumero" className="labrespNEnd" type="text" placeholder="Número do Logradouro" value={numero} onChange={(e) => setNumero(e.target.value)} required/>
                                </div>
                            </div>
                        </Painel>: null}
                        
                        <ButtonAcordion type="button" className="accordion" onClick={(e) => setIsOpen3(!isOpen3)}>Dados de login {isOpen3 ? <FaWindowMinimize/>: <FaPlus/>}</ButtonAcordion>
                        {isOpen3 ? <Painel isOpen={isOpen3}>
                            
                                    <label className="globalLab">E-mail: </label>
                                    <ReactInputMask id="labsEmail" className="labEmail" type="text" placeholder="Digite o seu e-mail" value={email} onChange={(e) => setEmail(e.target.value)} required/>

                                    <label className="globalLab">Senha: </label>
                                    <ReactInputMask id="labsSenha" className="labSenha" type="password" placeholder="Digite a senha" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                                
                                    <label className="globalLab">Confirme a Senha: </label>    
                                    <ReactInputMask id="labsConfSenha" className="labConfSenha" type="password" placeholder="Digite a senha" value={confirmpassword} onChange={(e) => setConfirmpassword(e.target.value)} required/>

                        </Painel>: null}

                        <button type="submit" id="submit" name="submit">Cadastrar</button>
                    </Form>
                </Container>
                : null}
                {mostrar.match('list') ?
                <Container onLoad={() => {
                }}>
                    <Form>
                        {empresas ? empresas.map(emp => {
                            return (
                                <EmpresaItem onClick={() => {
                                    setEmpresaSelecionado(emp);
                                    setMostrar('edit')
                                }} key={emp.id}>
                                    <p>{emp.nome}</p>
                                    <FaTrash onClick={() => {
                                        dispatch(actions.EMPRESA_DELETAR_REQUEST({id: emp.id}));
                                        dispatch(Loguot());
                                    }}></FaTrash>
                                </EmpresaItem>
                            );
                        }): null}
                    </Form>
                </Container>
                : null}
                {mostrar.match('search') ?
                <Container onLoad={() => {
                }}>
                    <div id="comentar">
                        <label>Pesquisar</label>
                        <div id="inputsubmit">
                            <input value={pesquisar} onChange={(e) => setPesquisar(e.target.value)}></input>
                            <AiOutlineSearch size={30} cursor={'pointer'} color="black" onClick={() => {
                                if(pesquisar){
                                    dispatch(USUARIO_BUSCARREQUEST({filter: "cpf_cnpj+like+"+pesquisar}));
                                }else{
                                    dispatch(USUARIO_BUSCARREQUEST());
                                }
                            }}></AiOutlineSearch>
                        </div>
                    </div>
                    <Form>
                        {usuarios ? usuarios.map(emp => {
                            return (
                                <EmpresaItem onClick={() => {
                                    let emps = empresas.find(em => em.email === emp.email);

                                    try{
                                        if(emps.email === user.user.email){
                                            console.log(emps)
                                            setEmpresaSelecionado(emps);
                                            setMostrar('edit');
                                        }
                                    }catch(err){
                                        toast.error("Não é possível alterar dados de outro usuário")
                                    }
                                }} key={emp.id}>
                                    <p>{emp.nome}</p>
                                </EmpresaItem>
                            );
                        }): null}
                    </Form>
                </Container>
                : null}
                {mostrar.match('edit') ? <EditarEmpresa empresa={empresaSelecionado} close={() => setMostrar('list')}></EditarEmpresa> : null}
            </div>
       </>
    );
}

