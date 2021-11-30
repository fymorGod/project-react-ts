import { useContext } from 'react';
import { VscGithubInverted } from 'react-icons/vsc';
import { AuthContext } from '../../contexts/auth';
import styles from './styles.module.scss';



export function LoginBox(){
    const { signInUrl } = useContext(AuthContext);
    //console.log(user);

    return (


        <div className={styles.loginBoxWrapper}>
            <strong>Entre e compartilhe sua messagem</strong>
            <a href={signInUrl} className={styles.SignInWithGitHub}>
                <VscGithubInverted size="24"/>
                Entrar com Github
            </a>
        </div>
    )
}