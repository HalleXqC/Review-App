import './Loading.css'

const Loading = ({color}) => {
    return (
        <div className={`lds-spinner ${color}`}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    )
}

export default Loading