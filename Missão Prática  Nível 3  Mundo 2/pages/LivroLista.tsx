import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Menu from '../pages/Menu';
import { LinhaLivro, TipoLivro } from '../Classes/componentes/LinhaLivro';

const baseURL = "http://localhost:3000/api/livros";

const LivroLista = () => {
  const [livros, setLivros] = useState<TipoLivro[]>([]);
  const [carregado, setCarregado] = useState(false);

  const fetchLivros = async () => {
    try {
      const response = await fetch(baseURL);
      const data = await response.json();
      
      if (Array.isArray(data)) {
        const livrosComCodEditora = data.map((livro) => ({
          ...livro,
          codEditora: livro.codEditora || 0,
        })) as TipoLivro[];

        setLivros(livrosComCodEditora);
        setCarregado(true);
      }
    } catch (error) {
      console.error('Erro ao buscar os livros:', error);
    }
  };

  useEffect(() => {
    if (!carregado) {
      fetchLivros();
    }
  }, [carregado]);

  const handleExcluirLivro = async (codigo: number) => {
    try {
     const response = await fetch(`${baseURL}/${codigo}`, { method: 'DELETE' });
     if (response.ok) {
       setLivros(livros.filter((livro) => livro.codigo !== codigo));
    }
    } catch (error) {
      console.error('Erro ao excluir o livro:', error);
    }
  };

  return (
    <div>
      <Head>
        <title>Livro Lista</title>
      </Head>
      <Menu />
      <main>
        <h1>Lista de Livros</h1>
        <table>
          <thead>
            <tr>
              <th>Título</th>
              <th>Resumo</th>
              <th>Autores</th>
              <th>Opções</th>
            </tr>
          </thead>
          <tbody>
            {livros.map((livro) => (
              <LinhaLivro key={livro.codigo} livro={livro} excluirLivro={handleExcluirLivro} />
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default LivroLista;
