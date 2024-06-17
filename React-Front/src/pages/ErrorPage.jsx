// IMPORTS 
// RRD
import { useNavigate } from 'react-router-dom';

// COMPONENT 

export const ErrorPage = () => {

    // Button hnalder 
    const navigate = useNavigate();
    const handleGoHome = () => { 
        navigate('/home');
    }

    return (
        <div
            className="ErrorPage"
            style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}>
            <div
                style={{
                    textAlign: 'center'
                }}>
                Oh no!
                <br />
                Loosk like nobody is hanging out over here!
            </div>

            <img
                src="/404cat.png"
                alt="sad cat"
                style={{ width: '100%' }}
            ></img>

            <button
            onClick={handleGoHome}
                style={{
                    backgroundColor: 'var(--primary-fill)',
                    width: 'fit-content',
                    border: 'none',
                    borderRadius: '25px',
                    padding: '10px',
                    cursor: 'pointer'
                }}>
                Take me home</button>

        </div>
    )
}