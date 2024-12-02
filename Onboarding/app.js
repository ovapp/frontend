// Função para gerar o hash SHA-1 da senha
async function sha1(input){
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const hashBuffer = await crypto.subtle.digest('SHA-1', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('').toUpperCase();
}

// Função para verificar a sneha na API do HIBP
async function checkPassword(password) {
    const feedback = document.getElementById('current-password');
    feedback.textContent = "Verificando a segurança da senha...";

    try {
        const hash = await sha1(password);
        const prefix = hash.substring(0, 5);
        const suffix = hash.substring(5);

        const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
        if (!response.ok) throw new Error(`Erro na API: ${response.status}`);

        const data = await response.text();
        const hashes = data.split('\n').map(line => line.split(':'));
        const match = hashes.find(([hashSuffix]) => hashSuffix === suffix);

        if (match) {
            feedback.textContent = `Senha comprometida ${match[1]} vezes! Considere outra.`;
            feedback.style.color = 'red';
        } else {
            feedback.textContent = "Senha segura! Não encontrada no banco de dados.";
            feedback.style.color = 'green';
        }
    
    } catch (error) {
        feedback.textContent = "Erro ao verificar a senha. Tente novamente.";
        feedback.style.color = 'orange';
        console.error(error);
    }
}

// reCAPTCHA 
function onSubmit(token) {
  document.getElementById("demo-form").submit();
}

