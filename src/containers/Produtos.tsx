import { useSelector } from 'react-redux'
import { Produto as ProdutoType } from '../App'

import * as S from './styles'
import { useGetProdutosQuery } from '../services/api'

import { RootReducer } from '../store'
import Produto from '../components/Produto'

const ProdutosComponent = () => {
  const { data: produtos, isLoading } = useGetProdutosQuery()
  const favoritos = useSelector((state: RootReducer) => state.favorito.itens)

  if (isLoading) return <h2>Carregando..</h2>

  const produtoEstaNosFavoritos = (produto: ProdutoType) => {
    const produtoId = produto.id
    const IdDosFavoritos = favoritos.map((f) => f.id)

    return IdDosFavoritos.includes(produtoId)
  }

  return (
    <>
      <S.Produtos>
        {produtos?.map((produto) => (
          <Produto
            estaNosFavoritos={produtoEstaNosFavoritos(produto)}
            key={produto.id}
            produto={produto}
          />
        ))}
      </S.Produtos>
    </>
  )
}

export default ProdutosComponent
