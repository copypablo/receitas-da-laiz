import { Link, NavLink, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { categories, recipesByCategory } from './data/recipes';

function RecipeCard({ recipe }) {
    return (
        <a
            className="recipe-card"
            href={recipe.href}
            target="_blank"
            rel="noreferrer"
            aria-label={`Abrir receita: ${recipe.title}`}
        >
            <img src={recipe.src} alt={recipe.title} loading="lazy" />
            <span>{recipe.title}</span>
        </a>
    );
}

function CategorySection({ categoryKey, title, showAllLink = false }) {
    const items = recipesByCategory[categoryKey] || [];
    const previewItems = showAllLink ? items.slice(0, 8) : items;

    return (
        <section className="category-block">
            <div className="section-head">
                <h2>{title}</h2>
                {showAllLink && <Link to={`/categoria/${categoryKey}`}>Ver tudo</Link>}
            </div>
            <div className="recipes-grid">
                {previewItems.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
            </div>
        </section>
    );
}

function HomePage() {
    return (
        <>
            <section className="hero">
                <div className="hero-copy">
                    <p className="kicker">Receitas Da Laiz</p>
                    <h1>Seu cardapio semanal com mais sabor e praticidade</h1>
                    <p>
                        Escolha a categoria, abra a receita no Instagram e monte combinacoes
                        completas para o dia a dia.
                    </p>
                </div>
                <img src="/LOGO-BACKGROUND/nome - laiz.PNG" alt="Receitas da Laiz" className="hero-brand" />
            </section>

            {categories.map((category) => (
                <CategorySection
                    key={category.key}
                    categoryKey={category.key}
                    title={category.label}
                    showAllLink
                />
            ))}
        </>
    );
}

function CategoryPage() {
    const location = useLocation();
    const categoryKey = location.pathname.split('/').pop();
    const category = categories.find((item) => item.key === categoryKey);

    if (!category) {
        return <Navigate to="/" replace />;
    }

    return (
        <>
            <section className="hero hero-inner">
                <div className="hero-copy">
                    <p className="kicker">Categoria</p>
                    <h1>{category.label}</h1>
                    <p></p>
                </div>
            </section>

            <CategorySection categoryKey={category.key} title={category.label} />
        </>
    );
}

export default function App() {
    return (
        <div className="app-shell">
            <header className="topbar">
                <Link to="/" className="logo-link" aria-label="Ir para inicio">
                    <img src="/LOGO-BACKGROUND/logo-life.png" alt="Life" />
                    <strong>Receitas Da Laiz</strong>
                </Link>

                <nav>
                    {categories.map((category) => (
                        <NavLink
                            key={category.key}
                            to={category.route}
                            className={({ isActive }) => (isActive ? 'nav-pill active' : 'nav-pill')}
                        >
                            {category.label}
                        </NavLink>
                    ))}
                </nav>
            </header>

            <main>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/categoria/:category" element={<CategoryPage />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </main>

            <footer className="footer">
                <p>Receitas Da Laiz • Conteudo original no Instagram</p>
            </footer>
        </div>
    );
}
