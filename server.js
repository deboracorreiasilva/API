const express = require('express');
const app = express();

app.use(express.json());

let cupcakes = [];
let avaliacoes = [];

app.get('/', (req, res) => {
    res.send('Bem vindo a nossa loja!');
});

app.post('/cupcakes', (req, res) => {
	const { massa, recheio_interno, recheio_externo, valor } = req.body;
	if (!massa || !recheio_interno || !recheio_externo || !valor) {
		return res.status(400).send('Todos os campos são obrigatórios');
	}else{
		cupcakes.push({massa, recheio_interno, recheio_externo, valor});
		res.send('Cupcake adicionado')
	};
});

app.get('/cupcakes', (req, res) => {
	res.send(cupcakes);
})

app.get('/cupcakes/:id', (req, res) => {
	const id = parseInt(req.params.id);
	const cupcake = cupcakes[id - 1];
	if (cupcakes) {
		res.send(cupcake);
	} else {
		res.send('Cupcake não encontrado');
	}
});

app.put('/cupcakes/:id', (req, res) => {
	const id = parseInt(req.params.id);
	if (cupcakes[id - 1]) {
		cupcakes[id - 1] = req.body;
		res.send('Cupcake atualizado');
	} else {
		res.send('Cupcake não encontrado');
	}
});

app.delete('/cupcakes/:id', (req, res) => {
	const id = parseInt(req.params.id);
	if (Number.isNaN(id) || id < 1 || id > cupcakes.length) return res.status(400).json({ erro: 'ID inválido' });
	if (!cupcakes[id - 1]) return res.status(404).json({ erro: 'Cupcake não encontrado' });
	cupcakes.splice(id - 1, 1);
	res.status(204).send();
});

app.post('/cupcakes/:id/avaliacoes', (req, res) => {
	const { titulo, avaliacao, data_postagem, nivel_satisfacao } = req.body;
	if (!titulo|| !avaliacao || !data_postagem || !nivel_satisfacao ) {
		return res.status(400).send('Todos os campos são obrigatórios');
	}else{
		avaliacoes.push({ cupcakesId: parseInt(req.params.id), ...req.body });
		res.send('Avaliação realizada')
	};
});

app.get('/cupcakes/:id/avaliacoes', (req, res) => {
	const cupcakesId = parseInt(req.params.id);
	const filtro = avaliacoes.filter(r => r.cupcakesId === cupcakesId);
	res.send(filtro);
});

app.get('/avaliacao/:id', (req, res) => {
	const id = parseInt(req.params.id);
	if (Number.isNaN(id) || id < 1) {
		return res.status(400).json({ erro: 'ID inválido' });
	}
	const avaliacao = avalacoes[id - 1];
	if (avaliacao) {
		return res.json(avaliacoes);
	}

	return res.status(404).json({ erro: 'Avaliação não encontrada' });
});

app.put('/avaliacao/:id', (req, res) => {
	const id = parseInt(req.params.id);
	if (avaliaces[id - 1]) {
		avaliacoes[id - 1] = req.body;
		res.send('Avalição atualizada');
	} else {
		res.send('Avaliação não encontrada');
	}
});

app.delete('/avaliacao/:id', (req, res) => {
	const id = parseInt(req.params.id);
	if (Number.isNaN(id) || id < 1 || id > avaliacoes.length){
		return res.status(400).json({ erro: 'ID de avaliacao inválido' })
	};
	if (!avaliacoes[id - 1]){
		return res.status(404).json({ erro: 'Avaliação não encontrada' })
	};
	avalacoes.splice(id - 1, 1);
	res.status(204).send();
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));

/*

http://localhost:3000/cupcakes

{
        massa, recheio_interno, recheio_externo, valor

        "nome": "baunilha",
        "recheio_interno": "Cho olzgd",
        "recheio_externo": "Pasta de leite",
        "valor": 3.0,
    }
    {
        "nome": "Chocolate",
        "recheio_interno": "Morango",
        "recheio_externo": "Pasta de leite",
        "valor": 3.0,
    }

http://localhost:3000/cupcakes/1/avaliacao

{
         titulo, avaliacao, data_postagem, nivel_satisfacao
"cupcakesId": 1,
        "titulo": "Combinação ideal",
        "avaliacao": "5 estrelas",
        "data_postagem": "11/11/2025",
        "nivel_satisfacao": "excelente"
    }

http://localhost:3000/cupacakes/2/avaliacao

{
        "cupcakesId": 2,
        "titulo": "Doce demais",
        "avaliacao": "3.0 estrelas",
        "data_postagem": "11/11/2025",
        "nivel_satisfacao": "mediano"
    },
    {
        "livroId": 2,
        "titulo": "Sabor ideal",
        "avaliacao": "4 estrelas",
        "data_postagem": "11/11/2025",
        "descricao": "bom"
    }


*/