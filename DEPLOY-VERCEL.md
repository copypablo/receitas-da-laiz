# Deploy na Vercel

## Pre-requisitos
- Projeto versionado no GitHub
- Conta na Vercel conectada ao GitHub

## Passo a passo
1. Acesse a Vercel e clique em `Add New > Project`.
2. Importe o repositorio `receitas-da-laiz`.
3. Confirme as configuracoes detectadas:
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Clique em `Deploy`.

## Observacoes
- As rotas de SPA estao cobertas em `vercel.json` com rewrite para `index.html`.
- Para novos deploys, basta fazer push na branch conectada.
