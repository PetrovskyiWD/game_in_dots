import React from 'react';

import GameForm from './components/GameForm';
import MessageArea from './components/MessageArea';
import GameArea from './components/GameArea';
import LeaderBoard from './components/LeaderBoard';

function App() {
	return (
		<div className="app">
			<div className="container">
				<div className="game_wrapper">
					<div className="part">
						<GameForm />
						<MessageArea />
						<GameArea />
					</div>
					<div className="part">
						<LeaderBoard />
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;