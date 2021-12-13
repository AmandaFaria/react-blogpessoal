import React, {useState, useEffect, ChangeEvent} from 'react'
import { Container, Typography, TextField, Button, Grid } from "@material-ui/core"
import Tema from '../../../models/Tema';
import { buscaId, post, put } from '../../../services/Service';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { toast } from 'react-toastify';


function CadastroTema() {
  let history = useHistory();
  const {id} = useParams<{id: string}>();
  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state) => state.tokens
);
  const [temas, setTemas] = useState<Tema>({
      id: 0,
      descricao: ''
  })

  useEffect(() => {
      if(token == ""){
        toast.error('Você precisa estar logado', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "colored",
            progress: undefined,
        });
          history.push("/login")
      }
  }, [token])

  useEffect(() => {
      if(id !== undefined){
          findById(id)
      }
  }, [id])

  async function findById(id: string){
      buscaId(`/temas/${id}`, setTemas, {
         headers: {
             'Authorization': token
         }
      })
  }

  function updatedTema(e: ChangeEvent<HTMLInputElement>){
      setTemas({
          ...temas,
          [e.target.name]: e.target.value,
      })
  }

  async function onSubmit(e: ChangeEvent<HTMLFormElement>){
      e.preventDefault()
      console.log("temas" + JSON.stringify(temas))

      if(id !== undefined){
          console.log(temas)
          put(`/temas`, temas, setTemas, {
              headers: {
                  'Authorization': token
              }
          })
          toast.success('Tema atualizado com sucesso', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "colored",
            progress: undefined,
        });
      }else{
          post(`/temas`, temas, setTemas, {
              headers:{
                  'Authorization': token
              }
          })
          toast.success('Tema cadastrado com sucesso', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "colored",
            progress: undefined,
        });
      }
      back()
  }

  function back(){
      history.push('/temas')
  }

    return (
        <Grid container direction='column' justifyContent='center' alignItems='center' className='fundo-login'>
        <Container maxWidth="sm" className="topo" style={{height:'100vh'}}>
            <form onSubmit={onSubmit}>
                <Typography variant="h3" style={{color:"#F0F1F2"}} component="h1" align="center" >Formulário de cadastro tema</Typography>
                <TextField value={temas.descricao} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedTema(e)} id="descricao" label="descricao" variant="outlined" name="descricao" margin="normal" fullWidth />
                <Button type="submit" variant="contained" style={{backgroundColor:"#D5BAD9", color:"#0D0D0D"}}>
                    Finalizar
                </Button>
            </form>
        </Container>
        </Grid>
    )
}

export default CadastroTema;