import { useState, useEffect } from 'react';
import Layout from '../components/common/Layout';
import { useProfile } from '../hooks/useProfile.jsx';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import jsPDF from 'jspdf';

const Dashboard = () => {
  const { profile } = useProfile();
  const [progressData, setProgressData] = useState([]);

  // Sample data for charts
  const weeklyProgress = [
    { day: 'Mon', words: 5, games: 2 },
    { day: 'Tue', words: 8, games: 3 },
    { day: 'Wed', words: 12, games: 4 },
    { day: 'Thu', words: 10, games: 3 },
    { day: 'Fri', words: 15, games: 5 },
    { day: 'Sat', words: 18, games: 6 },
    { day: 'Sun', words: 20, games: 7 },
  ];

  const moduleProgress = [
    { name: 'Alphabet', progress: 80 },
    { name: 'Words', progress: 60 },
    { name: 'Sentences', progress: 40 },
    { name: 'Stories', progress: 30 },
  ];

  const exportToPDF = () => {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(20);
    doc.text('LitBuddy Progress Report', 20, 20);
    
    // Add student info
    doc.setFontSize(12);
    doc.text(`Student: ${profile?.name || 'Buddy'}`, 20, 40);
    doc.text(`Points: ${profile?.points || 0}`, 20, 50);
    doc.text(`Badges: ${profile?.badges?.length || 0}`, 20, 60);
    
    // Add progress summary
    doc.text('Learning Progress:', 20, 80);
    moduleProgress.forEach((module, index) => {
      doc.text(`${module.name}: ${module.progress}%`, 30, 90 + (index * 10));
    });
    
    // Save the PDF
    doc.save('litbuddy-progress-report.pdf');
  };

  if (!profile) {
    return <div>Loading dashboard...</div>;
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Learning Dashboard</h1>
            <p className="text-gray-600">Progress overview for {profile.name}</p>
          </div>
          <button
            onClick={exportToPDF}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full font-semibold"
          >
            📊 Export PDF Report
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="text-3xl text-blue-500 mb-2">⭐</div>
            <div className="text-2xl font-bold">{profile.points}</div>
            <div className="text-gray-600">Total Points</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="text-3xl text-green-500 mb-2">🏆</div>
            <div className="text-2xl font-bold">{profile.badges.length}</div>
            <div className="text-gray-600">Badges Earned</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="text-3xl text-purple-500 mb-2">📚</div>
            <div className="text-2xl font-bold">24</div>
            <div className="text-gray-600">Words Learned</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="text-3xl text-orange-500 mb-2">⏱️</div>
            <div className="text-2xl font-bold">3.2h</div>
            <div className="text-gray-600">Learning Time</div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Weekly Progress Chart */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-bold mb-4">Weekly Progress</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyProgress}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="words" stroke="#8884d8" strokeWidth={2} />
                <Line type="monotone" dataKey="games" stroke="#82ca9d" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Module Progress Chart */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-bold mb-4">Module Progress</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={moduleProgress}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="progress" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Badges and Achievements */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
          <h3 className="text-xl font-bold mb-4">Recent Achievements</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {profile.badges.slice(0, 4).map((badgeId, index) => {
              const badge = {
                'alphabet_hero': { name: 'Alphabet Hero', icon: '🔤', color: 'blue' },
                'word_wizard': { name: 'Word Wizard', icon: '✨', color: 'green' },
                'story_star': { name: 'Story Star', icon: '⭐', color: 'yellow' },
                'game_champion': { name: 'Game Champion', icon: '🏆', color: 'purple' },
                'spell_master': { name: 'Spell Master', icon: '🧩', color: 'orange' }
              }[badgeId] || { name: badgeId, icon: '🏅', color: 'gray' };

              return (
                <div key={index} className={`bg-${badge.color}-100 rounded-2xl p-4 text-center`}>
                  <div className="text-4xl mb-2">{badge.icon}</div>
                  <div className="font-semibold">{badge.name}</div>
                  <div className="text-sm text-gray-600">Earned recently</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Learning Recommendations */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
          <h3 className="text-xl font-bold mb-2">Next Learning Steps</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/20 rounded-xl p-4">
              <div className="text-2xl mb-2">📖</div>
              <h4 className="font-semibold">Practice Sentences</h4>
              <p className="text-sm opacity-90">Try building longer sentences</p>
            </div>
            <div className="bg-white/20 rounded-xl p-4">
              <div className="text-2xl mb-2">🎮</div>
              <h4 className="font-semibold">Word Matching Game</h4>
              <p className="text-sm opacity-90">Improve vocabulary skills</p>
            </div>
            <div className="bg-white/20 rounded-xl p-4">
              <div className="text-2xl mb-2">🔊</div>
              <h4 className="font-semibold">Voice Practice</h4>
              <p className="text-sm opacity-90">Work on pronunciation</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;