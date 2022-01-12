import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiPower, FiEdit, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImage from '../../assets/logo.svg';
// Antes com o clique do usuário que disparava o carregamento da tela. Agora o useEffect serve para enquanto a tela estiver carregando os dados precisam ser buscados para serem renderizados corretamente. 
export default function Book() {

    const [books, setBooks] = useState([]);
    const [page, setPage] = useState(1);

    const userName = localStorage.getItem('userName');
    const accessToken = localStorage.getItem('accessToken');

    const authorization = {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    }

    const navigate = useNavigate();

    useEffect(() => {
        fetchMoreBooks();
    }, [accessToken]);

    async function fetchMoreBooks() {
        const response = await api.get(`api/book/v1/asc/4/${page}`, authorization);
            //Apendar(juntar) utilizando o spread operator o Array ...books com o que foi recuperado ...response.data.list
            setBooks([...books, ...response.data.list]);
            setPage(page + 1);      
    }
    //Para deletar  precisa atualizar a tela após a exclusão. Temos 2 caminhos.
    // 1 - Fazer uma function que refaz o useEffect acima  e ao invés de fazer 1 request de deleção serão feitas 2, 1 deleta e a outra recarrega a tela.
    // 2 - pega a lista em tela, lista de books, é remove aquilo que foi excluído. Utilizaremos este caso.
    async function deleteBook(id){
        try {
            await api.delete(`api/book/v1/${id}`, authorization);

            setBooks(books.filter(book => book.id !== id));
        } catch (error) {
            alert('Delete failed! Try again!');
        }
    }
    //Se não colocar o / antes de book/new/${id} ele soma com a endereço anterior ficando books/book/new... dando no match location.
    async function editBook(id){
        try {
           navigate(`/book/new/${id}`);
        } catch (error) {
            alert('Edit book failed! Try again!');
        }
    }

    async function logout(){
        try {
            await api.get('api/auth/v1/revoke', authorization);

            localStorage.clear();
            navigate('/');
        } catch (error) {
            alert('Logout failed! Try again!');
        }
    }


    return (
        <div className="book-container">
            <header>
                <img src={logoImage} alt="Erudio" />
                <span>Welcome, <strong>{userName}</strong></span>
                <Link className='button' to="/book/new/0">Add New Book</Link>
                <button onClick={logout} type="button">
                    <FiPower size={18} color="#251FC5" />
                </button>
            </header>

            <h1>Registered Books</h1>
            <ul>
                {books.map(book => (
                    <li key={book.id}>
                        <strong>Title:</strong>
                        <p>{book.title}</p>
                        <strong>Author:</strong>
                        <p>{book.author}</p>
                        <strong>Price:</strong>
                        <p>{Intl.NumberFormat('pt-BR',{style: 'currency', currency: 'BRL'}).format(book.price)}</p>
                        <strong>Release Date:</strong>
                        <p>{Intl.DateTimeFormat('pt-BR').format(new Date(book.launchDate))}</p>

                        <button onClick={() => editBook(book.id)} type="button">
                            <FiEdit size={20} color="#251FC5" />
                        </button>
                        {/* Se chamar a function direto no onClick={deleteBook(book.id)} ele ira apagar todos os livros da lista na hora que for carregar. Por isso devemos usar uma arrow function(quando for passar parâmetro) */}
                        <button onClick={() => deleteBook(book.id)} type="button">
                            <FiTrash2 size={20} color="#251FC5" />
                        </button>
                    </li>
                ))}
            </ul>
            <button className='button' onClick={fetchMoreBooks} type='button'>Load More</button>
        </div>
    );
}
