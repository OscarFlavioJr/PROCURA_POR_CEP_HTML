Buscador de CEP em HTML, CSS e TypeScript/JavaScript.
Trabalho feito por: Oscar Flávio Pereira da Silva Júnior  
RA: 1292315121  
Professor: Marivaldo Pereira dos Santos

Requisitos (R) e como foram cumpridos (C):

<h3>R - A página deve conter um campo de entrada para o CEP e um botão para realizar a busca.</h3>
C - A página conta com alguns campos de input e Placeholder, que tem como função demonstrar ao usuário onde colocar as informações necessárias.

<h3>R - Ao clicar no botão, deve ser feita uma requisição fetch para a API https://viacep.com.br/ws/{cep}/json/.</h3>
C - O botão é tratado no Typescript, onde recebe a seguinte função:

````form.addEventListener('submit', async (e) => {
   e.preventDefault();
   const rawCEP = input.value.trim();
   const cep = formatCEP(rawCEP);
   if (!isValidCEP(cep)) {
   showError('CEP inválido');
   return;
 }```


O Fetch (Recebedor de informações da API, pode ser visto na linha 54 do script.ts!)

<h3>R - Os dados retornados devem ser exibidos no navegador: logradouro, bairro, localidade e UF.</h3>
C - Os dados são tratados pela API e apresentados conforme sua integridade!

<h3>R - O sistema deve tratar CEPs inválidos (exemplo: menos de 8 dígitos ou erro da API).</h3>
C - O Sistema trata estes erros conforme pode ser visto nas seguintes funções:

````

    form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const rawCEP = input.value.trim();
    const cep = formatCEP(rawCEP);
    if (!isValidCEP(cep))
    {
        showError("CEP inválido");
        return;
    }
    else if (rawCEP === "" || rawCEP.length < 8)
    {
    showError("Por favor, insira um CEP válido.");
    return;

}

```
 E :
```

function showError(message: string): void {
result.innerHTML = `<p style="color: red; font-weight: bold;">${message}</p>`;

}

```
