export default (event, that) => {
    const targetName = event.target.name;
    const targetValue = event.target.value
    that.setState({
        [targetName]: targetValue
    });
}