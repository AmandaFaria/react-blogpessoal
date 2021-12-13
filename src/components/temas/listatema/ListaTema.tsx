import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Box, Card, CardActions, CardContent, Button, Typography } from '@material-ui/core';
import Tema from '../../../models/Tema';
import './ListaTema.css';
import { useHistory } from 'react-router-dom';
import { busca } from '../../../services/Service';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { toast } from 'react-toastify';

function ListaTema() {
  const [temas, setTemas] = useState<Tema[]>([])
  let history = useHistory();
  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state) => state.tokens
);

  useEffect(() => {
    if (token == '') {
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

  async function getTemas() {
    await busca("/temas", setTemas, {
      headers: {
        'Authorization': token
      }
    })
  }

  useEffect(() => {
    getTemas()
  }, [temas.length])

  return (
    <>
      {
        temas.map(temas =>(
        <Box m={2} >
          <Card variant="outlined">
            <CardContent className='cor-tema'>
              <Typography className='cor-tema' gutterBottom>
                Tema
              </Typography>
              <Typography variant="h5" component="h2">
                {temas.descricao}
              </Typography>
            </CardContent>
            <CardActions className='cor-tema'>
              <Box display="flex" justifyContent="center" mb={1.5} >

                <Link to={`/formularioTema/${temas.id}`} className="text-decorator-none">
                  <Box mx={1}>
                    <Button variant="contained" className="botao-atualizar" size='small' color="primary" >
                      atualizar
                    </Button>
                  </Box>
                </Link>
                <Link to={`/deletarTema/${temas.id}`} className="text-decorator-none">
                  <Box mx={1}>
                    <Button variant="contained" size='small' color="secondary">
                      deletar
                    </Button>
                  </Box>
                </Link>
              </Box>
            </CardActions>
          </Card>
        </Box>
        ))
      }
    </>
  );
}


export default ListaTema;