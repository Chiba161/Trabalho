import React, { useState } from 'react';
import Head from 'next/head';
import Menu from '../pages/Menu';
import styles from '../styles/Home.module.css';
import ControleEditora from '../Classes/controle/ControleEditora';
import { useRouter } from 'next/router';

const baseURL = "http://localhost:3000/api/livros";

const LivroDados: React.FC = () => {
  const controleEditora = new ControleEditora();

  const [titulo, setTitulo] = useState('');
  const [resumo, setResumo] = useState('');
  const [autores, setAutores] = useState('');
  const [codEditora, setCodEditora] = useState('0');
  const opcoes = controleEditora.getEditoras().map(editora => ({ value: String(editora.codEditora), text: editora.nome }));

  const navigate = useRouter();

  const incluirLivro = async (livro: any) => {
    try {
      const response = await fetch(baseURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(livro)
      });
      return response.ok;
    } catch (error) {
      console.error('Erro ao incluir o livro:', error);
      return false;
    }
  };

  const tratarCombo = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCodEditora(event.target.value);
  };

  const incluir = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const novoLivro = {
      codigo: 0,
      codEditora: Number(codEditora),
      titulo,
      resumo,
      autores: autores.split('\n')
    };

    const incluido = await incluirLivro(novoLivro);

    if (incluido) {
      navigate.push('/LivroLista');
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Livro Dados</title>
      </Head>
      <Menu />
      <main>
        <h1 className={styles.title}>Cadastro de Livros</h1>
        <form onSubmit={incluir}>
          <label htmlFor="titulo">Título:</label>
          <input type="text" id="titulo" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
          <br />
          <label htmlFor="resumo">Resumo:</label>
          <input type="text" id="resumo" value={resumo} onChange={(e) => setResumo(e.target.value)} />
          <br />
          <label htmlFor="autores">Autores (separados por linha):</label>
          <textarea id="autores" value={autores} onChange={(e) => setAutores(e.target.value)} />
          <br />
          <label htmlFor="editora">Editora:</label>
          <select id="editora" value={codEditora} onChange={tratarCombo}>
            <option value="0">Selecione uma editora</option>
            {opcoes.map(opcao => (
              <option key={opcao.value} value={opcao.value}>{opcao.text}</option>
            ))}
          </select>
          <br />
          <button type="submit">Adicionar Livro</button>
        </form>
      </main>
    </div>
  );
};

export default LivroDados;
