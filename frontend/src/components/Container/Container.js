/*import { useState } from "react";*/
import styles from './Container.module.css';
/*import styled from "styled-components"*/
import { Link } from "react-router-dom";

function Container({name, getData}){

    /*const[showMessage, setShowMessage] = useState(true)*/
    /*const[message] = useState('Bienvenido al sufrimiento eterno');
    
/*    const onButtonClick = () => {
        setShowMessage(!showMessage)
        /*if(message){
            setMessage("Cargando...")
        }
        getData();*/
    
    return(
        <div className = {styles.container}>
           {/*<h1 className={styles.title}>
                Contenedor
            </h1>
            {showMessage?
                <p className={styles.estadito}>
                {message}{name}
                </p>
                :
                null
            }
        */}
            <Link to ="/about">

                Ir a about
            </Link>
        </div>
    )
        

/*
    constructor(props){
        super(props);
        this.state = {
            message: `Bienvenido al sufrimiento eterno,${this.props.nombre}`,
        };
        
        this.onButtonClick = this.onButtonClick.bind(this);
    }
    onButtonClick(){
        if(this.state.message){
            this.setState({message: "Cargando..."});
        }
        this.props.getData(10);
    }*/
}


/*
const Button = styled.button`
    background-color: #3DFF29;
    border-radius: 20px;
    color: black
`*/



export default Container;