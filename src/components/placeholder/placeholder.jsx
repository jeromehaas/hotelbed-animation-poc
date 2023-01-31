const Placeholder = ({ color = 'black'}) => {
	
	return (
		<div className={`placeholder placeholder--${ color }`}></div>	
	);
}

export { Placeholder }