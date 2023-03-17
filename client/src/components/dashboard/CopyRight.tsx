import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export const Copyright = (props: any) => {
    return (
        <Typography variant='body2' color={'inherit'} align='center' {...props}>
            {'Copyright © '}
            <Link color={'inherit'} href='https://gitlab.com/jfiora'>
                jfiora's Repo
            </Link>{' '}
            {new Date().getFullYear()}
        </Typography>
    );
};
