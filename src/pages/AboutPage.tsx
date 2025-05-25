import * as React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-pink-200 py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Про магазин</h1>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">Наша історія</h2>
            <div className="prose prose-lg mx-auto text-gray-700">
              <p>
                Усе почалося з любові до домашньої випічки та бажання дарувати людям солодкі емоції. Маленька кухня, перші замовлення для друзів і мрія про власний куточок щастя — так народився наш кондитерський магазин. Сьогодні ми щодня створюємо десерти з душею: ніжні, ароматні, натхненні найкращими моментами життя. Кожен торт, тістечко чи пряник — це не просто смакота, а історія, яку ми розповідаємо через солодке.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;