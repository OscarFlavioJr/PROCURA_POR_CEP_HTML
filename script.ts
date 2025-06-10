type Address = {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
};

const form = document.querySelector("form") as HTMLFormElement;
const input = document.querySelector("input") as HTMLInputElement;
const result = document.querySelector(".result") as HTMLDivElement;
const resultTitle = result.querySelector(".result-title") as HTMLElement;
const clearButton = document.querySelector(".btn-clear") as HTMLButtonElement;

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const rawCEP = input.value.trim();

  if (rawCEP === "") {
    showError("Por favor, insira um CEP válido.");
    return;
  }
  if (rawCEP.length < 8) {
    showError("CEP deve ter 8 dígitos.");
    return;
  }

  const cep = formatCEP(rawCEP);

  if (!isValidCEP(cep)) {
    showError("CEP inválido");
    return;
  }

  clearResult();
  showLoading();

  try {
    const address = await fetchAddress(cep);
    if (address.erro) {
      showError("CEP não encontrado.");
    } else {
      showAddress(address);
    }
  } catch {
    showError("Erro ao buscar o CEP.");
  }
});

clearButton.addEventListener("click", () => {
  input.value = "";
  clearResult();
});

function formatCEP(cep: string): string {
  return cep.replace(/\D/g, "").replace(/(\d{5})(\d{3})/, "$1-$2");
}

function isValidCEP(cep: string): boolean {
  return /^\d{5}-?\d{3}$/.test(cep);
}

async function fetchAddress(cep: string): Promise<Address> {
  const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
  return response.json();
}

function showAddress(address: Address): void {
  result.innerHTML = `
    <h2 class="result-title">Endereço encontrado:</h2>
    <p><strong>Rua:</strong> ${address.logradouro}</p>
    <p><strong>Bairro:</strong> ${address.bairro}</p>
    <p><strong>Cidade:</strong> ${address.localidade}</p>
    <p><strong>Estado:</strong> ${address.uf}</p>
    <p><strong>CEP:</strong> ${address.cep}</p>
  `;
}

function showError(message: string): void {
  result.innerHTML = `<p style="color: red; font-weight: bold;">${message}</p>`;
}

function clearResult(): void {
  result.innerHTML = "";
}

function showLoading(): void {
  result.innerHTML = `<p>Carregando...</p>`;
}
