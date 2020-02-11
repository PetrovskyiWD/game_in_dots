import React, { useEffect } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';

import './style.scss';

const LeaderBoard = () => {
	const { fetchLeaders, sendingWinner } = useStoreActions(actions => actions.leaderBoard);
	const { winner } = useStoreState(state => state.game);
	const { loading, leaders } = useStoreState(state => state.leaderBoard);

	useEffect(() => {
		fetchLeaders();
	}, [fetchLeaders]);

	useEffect(() => {
		if (winner) {
			const date = `${new Date().toDateString()}, ${new Date().toTimeString().slice(0, 5)}`;
			sendingWinner({
				winner,
				date
			});
		}
	}, [winner, sendingWinner]);

	if (loading) return <span>Loading leaders...</span>;

	return (
		<div className="leader_board">
			<h2>Leader Board</h2>
			<ul className="leaders_list">
				{!!leaders.length && leaders.map(leader => (
					<li key={leader.id}>
						<span>{leader.winner}</span>
						<span>{leader.date}</span>
					</li>
				))}
			</ul>
		</div>
	);
};

export default LeaderBoard;
