import { Link } from 'react-router-dom';
import Layout from '../components/common/Layout';

const Home = () => {
  return (
    <Layout>
      <div className="text-center space-y-8">
        
        <div className="max-w-4xl mx-auto">
          <div className="text-8xl mb-4">📚✨</div>
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Welcome to LitBuddy!
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Your fun reading companion that helps you learn letters, words, and stories!
          </p>
          
          <Link
            to="/learn"
            className="btn-primary text-lg px-8 py-4 inline-block"
          >
            Start Learning Adventure! 🚀
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mt-12">
          <div className="card text-center">
            <div className="text-6xl mb-4">🎮</div>
            <h3 className="text-xl font-bold mb-2">Fun Games</h3>
            <p className="text-gray-600">Play exciting word games and earn points!</p>
          </div>

          <div className="card text-center">
            <div className="text-6xl mb-4">🎤</div>
            <h3 className="text-xl font-bold mb-2">Voice Practice</h3>
            <p className="text-gray-600">Read aloud and get instant feedback!</p>
          </div>

          <div className="card text-center">
            <div className="text-6xl mb-4">🏆</div>
            <h3 className="text-xl font-bold mb-2">Earn Rewards</h3>
            <p className="text-gray-600">Collect badges and unlock new adventures!</p>
          </div>
        </div>

        
        <div className="bg-white/50 rounded-2xl p-6 max-w-md mx-auto">
          <h3 className="font-bold text-lg mb-4">Learning Path</h3>
          <div className="space-y-3">
            {['Alphabet', 'Words', 'Sentences', 'Stories'].map((step, index) => (
              <div key={step} className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center">
                  {index + 1}
                </div>
                <span className="text-gray-700">{step}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
