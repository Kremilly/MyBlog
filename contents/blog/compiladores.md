---
Title: O que é um Compilador?
Description: Um compilador é um programa de computador que traduz código-fonte escrito em uma linguagem de programação de alto nível (como C, C++, Java) para uma linguagem de baixo nível, geralmente código de máquina que um computador pode executar diretamente, ou para um código intermediário que é posteriormente interpretado ou compilado em código de máquina.
Date: 2024-08-18
CoverTitle: Compiladores
CoverFontSize: 42
Tags: baixo-nivel, compiladores, arquitetura, codigo-fonte
DownloadPdf: enabled
---
Um compilador é um programa de computador que traduz código-fonte escrito em uma linguagem de programação de alto nível (como C, C++, Java) para uma linguagem de baixo nível, geralmente código de máquina que um computador pode executar diretamente, ou para um código intermediário que é posteriormente interpretado ou compilado em código de máquina.

## Componentes e Funcionamento de um Compilador

1. **Análise Léxica (Lexical Analysis)**:

   - O código-fonte é lido e dividido em unidades menores chamadas tokens. Cada token representa uma unidade sintática básica, como palavras-chave, identificadores, operadores e símbolos.
2. **Análise Sintática (Syntax Analysis)**:

   - Os tokens gerados na análise léxica são organizados em uma estrutura hierárquica chamada árvore sintática (ou árvore de análise). Esta etapa verifica se a sequência de tokens segue as regras gramaticais da linguagem.
3. **Análise Semântica (Semantic Analysis)**:

   - A árvore sintática é examinada para garantir que ela faz sentido semanticamente. Isso envolve verificar tipos de dados, declarações de variáveis, e a coerência das operações.
4. **Otimização (Optimization)**:

   - O código intermediário gerado é otimizado para melhorar seu desempenho. Isso pode incluir a eliminação de código redundante, a simplificação de expressões, e a reorganização de instruções para melhorar a eficiência.
5. **Geração de Código (Code Generation)**:

   - O código otimizado é convertido em código de máquina ou em um código intermediário específico da plataforma de destino.
6. **Ligação (Linking)**:

   - Se o programa é composto de múltiplos módulos ou depende de bibliotecas externas, o processo de ligação combina todos esses módulos em um único programa executável.

## Exemplo Prático

Para ilustrar, considere um pequeno programa em C:

```c
int main() {
    int a = 10;
    int b = 20;
    int c = a + b;
    return c;
}
```

### Análise Léxica

Tokens identificados podem incluir: `int`, `main`, `()`, `{`, `a`, `=`, `10`, `;`, etc.

### Análise Sintática

Uma árvore sintática é construída representando a estrutura do programa:

```
Function: main
  - Declaration: int a = 10
  - Declaration: int b = 20
  - Declaration: int c = a + b
  - Return: c
```

### Análise Semântica

Verificação dos tipos de `a`, `b` e `c`, e das operações realizadas entre eles.

### Otimização

O compilador pode identificar que `a` e `b` são constantes e otimizar a expressão `c = a + b` para `c = 30`.

### Geração de Código

O código de máquina correspondente é gerado para ser executado pelo processador.

### Ligação

Se houver dependências externas, elas são resolvidas para produzir o arquivo executável final.

Compiladores são fundamentais para a execução eficiente de programas em diversos sistemas e plataformas, e seu design e implementação são áreas complexas e importantes da ciência da computação.

## Tipos de Compiladores

Os compiladores podem ser categorizados de várias maneiras, dependendo de diversos critérios como a linguagem de origem, a linguagem de destino, a fase de execução e o propósito. Aqui estão alguns dos principais tipos de compiladores:

### Classificação por Linguagem de Origem e Destino

1. **Compiladores de Linguagem de Alto Nível para Linguagem de Baixo Nível**:

   - **Compiladores Tradicionais**: Traduzem linguagens de alto nível (como C, C++, Fortran) para código de máquina específico de um processador.
   - **Compiladores Cruzados (Cross Compilers)**: Produzem código executável para uma plataforma diferente daquela em que o compilador está sendo executado. Útil no desenvolvimento de software embarcado.
2. **Compiladores de Linguagem de Alto Nível para Código Intermediário**:

   - **Compiladores para Máquinas Virtuais**: Traduzem o código-fonte para um código intermediário que será executado em uma máquina virtual. Exemplos incluem compiladores para Java (que produzem bytecode JVM) e C# (que produzem bytecode CLR).
3. **Compiladores de Linguagem de Alto Nível para Outra Linguagem de Alto Nível**:

   - **Transcompiladores (Transpilers)**: Traduzem código de uma linguagem de alto nível para outra linguagem de alto nível. Por exemplo, um transcompilador que converte TypeScript para JavaScript.

### Classificação por Fase de Execução

1. **Compiladores de Passagem Única (Single-Pass Compilers)**:

   - Realizam a tradução em uma única passagem pelo código-fonte, o que pode ser mais rápido, mas oferece menos oportunidades para otimizações complexas.
2. **Compiladores de Múltiplas Passagens (Multi-Pass Compilers)**:

   - Realizam várias passagens pelo código-fonte, permitindo análises e otimizações mais detalhadas.
3. **Compiladores Just-in-Time (JIT Compilers)**:

   - Compilam o código em tempo de execução, frequentemente usados em ambientes de execução de linguagens como Java e C#. Eles combinam as vantagens de interpretação (facilidade de portabilidade) e compilação (eficiência de execução).

### Classificação por Técnica de Tradução

1. **Compiladores de Linguagem de Terceira Geração (3GL)**:

   - Traduzem linguagens de programação de terceira geração, como C e Fortran, para código de máquina.
2. **Compiladores de Linguagem de Quarta Geração (4GL)**:

   - Traduzem linguagens de programação de quarta geração, que são mais orientadas a aplicações, como SQL e MATLAB.

### Classificação por Propósito

1. **Compiladores de Propósito Geral**:

   - Projetados para uma ampla variedade de aplicações e não são específicos de nenhum domínio particular. Exemplos incluem GCC (GNU Compiler Collection) e Clang.
2. **Compiladores de Propósito Específico**:

   - Projetados para um domínio específico ou um tipo particular de aplicação. Por exemplo, compiladores para linguagens de hardware como VHDL ou Verilog.

### Classificação por Nível de Otimização

1. **Compiladores de Otimização Zero (Non-Optimizing Compilers)**:

   - Focam em traduzir o código-fonte para código de máquina sem realizar otimizações significativas. Úteis para desenvolvimento rápido e depuração.
2. **Compiladores de Alta Otimização (Optimizing Compilers)**:

   - Realizam várias otimizações para melhorar a eficiência do código executável. Exemplos incluem otimizações de loop, inlining, e eliminação de código morto.

### Exemplos de Compiladores

- **GCC (GNU Compiler Collection)**: Suporta várias linguagens como C, C++, Fortran, Ada, e mais.
- **Clang**: Um compilador para C, C++, e Objective-C, parte do projeto LLVM.
- **Javac**: Compilador para a linguagem de programação Java, que produz bytecode para a JVM.
- **MSVC (Microsoft Visual C++)**: Compilador para C++ da Microsoft.
- **Rustc**: Compilador para a linguagem de programação Rust.
- **Erlang/OTP**: Compilador para a linguagem de programação Erlang, que produz bytecode para a máquina virtual BEAM.

Cada tipo de compilador serve a um propósito específico e é otimizado para diferentes aspectos da tradução e execução de programas, dependendo das necessidades do desenvolvedor e do ambiente de execução.
