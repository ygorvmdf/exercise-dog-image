import React from 'react';

class FetchDog extends React.Component {
    constructor() {
        super();

        this.fetchDog = this.fetchDog.bind(this);

        this.state = {
            dogPath: '',
            error: '',
            loading: true
        }
    }

    async fetchDog() {
        this.setState({ loading: true});
        const dogResponse = await fetch('https://dog.ceo/api/breeds/image/random');
        const dogJson = await dogResponse.json();
        if (dogJson.status === "success") {
            localStorage.setItem('image', dogJson.message);
            this.setState({
                loading: false,
                dogPath: dogJson.message
            })
        } else {
            this.setState({
                error: dogJson.message
            })
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (/terrier/g.test(nextState.dogPath)) {
          return false;
        } else {
          return true;
        }
    }

    componentDidMount() {
        this.fetchDog()
    }

    componentDidUpdate(prevProps, prevState) {
        const dogBreed = this.state.dogPath.split('/')[4];
        if (dogBreed && !this.state.loading) {
          alert(` The breed is ${dogBreed}`);
        }
    }

    render() {
        const { dogPath, loading } = this.state;

        return (
            <div>
                {loading ? <h1>Loading...</h1> : <img src={dogPath}/>}
                <button onClick={this.fetchDog}>New Dog</button>
            </div>
        )
    }
}

export default FetchDog;
