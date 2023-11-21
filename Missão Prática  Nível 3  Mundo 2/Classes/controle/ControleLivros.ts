import Livro from '../modelo/Livro';

let livros: Livro[] = [
    new Livro(1, 1, 'Livro 1', 'Resumo do Livro 1', ['Autor 1']),
    new Livro(2, 2, 'Livro 2', 'Resumo do Livro 2', ['Autor 2']),
    new Livro(3, 3, 'Livro 3', 'Resumo do Livro 3', ['Autor 3'])
];

class ControleLivros {
    obterLivros(): Livro[] {
        return livros;
    }

    incluir(novoLivro: Livro): void {
        const novoCodigo = livros.reduce((max, livro) => (livro.codigo > max ? livro.codigo : max), 0) + 1;
        novoLivro.codigo = novoCodigo;
        livros.push(novoLivro);
    }

    excluir(codigoLivro: number): void {
        const indiceLivro = livros.findIndex(livro => livro.codigo === codigoLivro);
        if (indiceLivro !== -1) {
            livros.splice(indiceLivro, 1);
        }
    }
}

export default ControleLivros;
