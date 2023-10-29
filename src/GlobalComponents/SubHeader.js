import React from "react";
import { SubHeaderContainer } from "./styled";
import { useSelector, useDispatch } from "react-redux";
import UploadPhoto from "./UploadPhoto";
import * as actions from "../store/modules/arquivosreducer/actions";

export default function SubHeader(props){
    const user = useSelector(state => state.authreducer.user);

    const [filter, setFilter] = React.useState('id+eq+'+user.id_foto);
    const dispatch = useDispatch();

    return (
        <SubHeaderContainer>
            <img  style={{widows: 120, height: 120}}></img>

            <UploadPhoto filter={filter} size={{container: 125, img: 200}} change={false}></UploadPhoto>
        </SubHeaderContainer>
    );
}
