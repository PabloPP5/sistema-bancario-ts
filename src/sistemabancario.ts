import * as readline from "readline";

class Pessoa {
  nome: string;
  saldo: number = 0;

  constructor(nome: string) {
    this.nome = nome;
  }

  depositar(valor: number) {
    this.saldo += valor;
  }

  sacar(valor: number) {
    if (valor > this.saldo) {
      console.log("Saldo insuficiente");
      return;
    }
    this.saldo -= valor;
  }

  transferir(destino: Pessoa, valor: number) {
    if (valor > this.saldo) {
      console.log("Saldo insuficiente para transferência");
      return;
    }
    this.sacar(valor);
    destino.depositar(valor);
  }

  mostrarSaldo() {
    console.log(this.nome, "tem R$", this.saldo);
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function perguntar(pergunta: string): Promise<string> {
  return new Promise(resolve => rl.question(pergunta, resolve));
}

async function main() {
  const pessoa1 = new Pessoa("P1");
  const pessoa2 = new Pessoa("P2");
  let opcao = "";

  async function pausar() {
    await perguntar("\nPressione ENTER pra continuar...");
}

  while (opcao !== "0") {
    console.clear();
    console.log("\n1 - Depositar");
    console.log("2 - Sacar");
    console.log("3 - Transferir");
    console.log("4 - Mostrar saldos");
    console.log("0 - Sair");

    opcao = await perguntar("Escolha uma opção: ");

    switch (opcao) {
      case "1": {
        const valor = Number(await perguntar("Valor para depositar: "));
        pessoa1.depositar(valor);
        break;
      }

      case "2": {
        const valor = Number(await perguntar("Valor para sacar: "));
        pessoa1.sacar(valor);
        break;
      }

      case "3": {
        const valor = Number(await perguntar("Valor para transferir: "));
        pessoa1.transferir(pessoa2, valor);
        break;
      }

      case "4":
        pessoa1.mostrarSaldo();
        pessoa2.mostrarSaldo();
        await pausar();
        break;

      case "0":
        console.log("Saindo...");
        break;

      default:
        console.log("Opção inválida");
    }
  }
  rl.close();
}
main();