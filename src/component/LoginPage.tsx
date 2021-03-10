import * as React from 'react';
import * as classNames from 'classnames/bind';

import { Link } from 'react-router-dom';

import { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';

import FormHelperText from '@material-ui/core/FormHelperText';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';

import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Visibility from '@material-ui/icons/Visibility';

import green from '@material-ui/core/colors/green';


import './Login.css';
import '../GatherApp.css';
import './Login.css';

import TextField from '@material-ui/core/TextField';

const styles: StyleRulesCallback<'root'> = theme => ({
    root: {
        justifyContent: 'center',
        flexGrow: 1,
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        width: '100%',
        height: '100%',
        paddingBottom: '92px',
        margin: 'auto',
    },
    colorGrey: {
        fontSize: '29px',
        '@media (min-width: 768px)': {
            fontSize: 40,
        },
    },
    margin: {
        margin: 'auto',
        width: '300px',
        '@media (max-width: 320px)': {
            width: '244px',
        },
    },
    textField: {
        display: 'block',
        flexBasis: 200,
        marginTop: '5px',
        height: 72,
        '@media (max-width: 320px)': {
            height: 75,
        },
    },
    inputHeader: {
        width: '100%',
        textAlign: 'center',
        paddingBottom: '37px',
        paddingTop: '15px',
    },
    gatherLogo: {
        width: '100%',
        textAlign: 'center',
        '& img': {
            maxWidth: 320,
            maxHeight: 92,
            paddingTop: '60px',
        },
    },
    btnForgetPw: {
        color: '#b3b3b3',
        float: 'left',
        fontSize: '15px',
        textDecoration: 'none',
        lineHeight: '1.375em',
        '&:hover': {
            backgroundColor: 'white',
            textDecoration: 'underline',
        },
    },
    gridBtn: {
        width: '300px',
        margin: 'auto',
        paddingTop: '17px',
        '@media (max-width: 320px)': {
            width: '244px',
        },
    },
    btnLogin: {
        float: 'right',
        boxShadow: `0px 1px 5px 0px rgba(0, 0, 0, 0.2),
        0px 2px 2px 0px rgba(0, 0, 0, 0.14),
        0px 3px 1px -2px rgba(0, 0, 0, 0.12)`,
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    marginTop35: {
        marginTop: 35,
    },
    textDivider: {
        display: 'block',
        textAlign: 'center',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
    },
    fontSize20: {
        fontSize: 20,
    },
    formWidth: {
        width: '100%',
        paddingTop: '10px',
        textAlign: 'center'
    },
    marginTop20: {
        width: '100%',
        textAlign: 'center',
        marginTop: '20px',
    },
    paddingBottom10: {
        marginBottom: '-10px',
    },
    loginBtnWidth: {
        float: ' right',
    },
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    width100: {
        width: '100%',
    },
    loginInputField: {
        display: ' grid',
        paddingTop: '0px',
        paddingLeft: 0,
        '& span': {
            textTransform: 'capitalize',
            fontSize: '15px',
        },
    },
    m_0: {
        margin: 0
    }
});

let cx = classNames.bind(styles);

interface Props {
}

interface State {
    emailOrPhone: string;
    password: string;
    showPassword: boolean;
    invalidCredentials: boolean;
    loginAttempted: boolean;
}

type StyledProps = Props &
    WithStyles<'root' | 'colorGrey' | 'inputField' | 'textField' | 'margin' | 'inputHeader'
        | 'logoToolbar' | 'gatherLogo' | 'btnForgetPw' | 'btnLogin' | 'gridBtn'
        | 'marginTop20' | 'marginTop35' | 'leftIcon' | 'marginTop35' | 'loginInputField'
        | 'textDivider' | 'fontSize20' | 'formWidth' | 'paddingBottom10' | 'loginBtnWidth'
        | 'buttonProgress'  | 'disabled' | 'width100' | 'm_0'>;

class LoginPage extends React.Component<StyledProps, State> {

    state = {
        emailOrPhone: '',
        password: '',
        showPassword: false,
        invalidCredentials: false,
        loginAttempted: false,
    };

    handleClickShowPassword = () => {
        this.setState({ showPassword: !this.state.showPassword });
    }

    isValid = () => {
        const { emailOrPhone, password } = this.state;

        const validEmail = isValidEmail(emailOrPhone);
        const validPhone = isValidPhoneNumber(emailOrPhone);

        const invalidCredentials = (!validEmail && !validPhone) || !password;

        this.setState({
            invalidCredentials,
            loginAttempted: true,
        });
        return !invalidCredentials;
    }

    handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        // const { dispatch } = this.props;
        const { emailOrPhone, password } = this.state;

        event.preventDefault();

        if (this.isValid()) {
            const validEmail = isValidEmail(emailOrPhone);
            const validPhone = isValidPhoneNumber(emailOrPhone);
            const email = validEmail ? emailOrPhone : null;
            const phone = validPhone ? emailOrPhone : null;

            // const result = await dispatch(attemptUserLogin(email, phone, password));
            if (!result) {
                this.setState({
                    invalidCredentials: true,
                });
            }
        }
        return;
    }

    resetInvalidFlag = () => {
        this.setState({
            invalidCredentials: false,
        });
    }

    render() {
        const { classes, isLoginPending } = this.props;
        const { emailOrPhone, password, showPassword, invalidCredentials, loginAttempted } = this.state;
        const Title = 'Please Log In to Continue';

        return (
            <Grid container={true} className={classes.root} >
                <Grid item={true} className={classes.gatherLogo}>
                    {/* <FuneralHomeLogo /> */}
                    <Typography color="secondary" variant="h5" component="h1" className={classes.colorGrey}>
                        {Title}
                    </Typography>
                </Grid>

                <Grid item={true} className={classes.formWidth}>
                    <form autoComplete="off" onSubmit={this.handleSubmit}>
                        <FormControl
                            className={classNames(classes.margin, classes.textField)}
                            error={loginAttempted && invalidCredentials}
                        >
                            <TextField
                                label="Your Email or Mobile Number"
                                error={loginAttempted && invalidCredentials}
                                className={classes.width100}
                                tabIndex={1}
                                name="email_or_phone"
                                type="text"
                                id="adornment-email"
                                value={emailOrPhone}
                                onChange={(e) => this.setState({ emailOrPhone: e.target.value })}
                                onFocus={this.resetInvalidFlag}
                            />
                            {loginAttempted && !emailOrPhone ?
                                <FormHelperText>Please enter your email or mobile number</FormHelperText>
                                : invalidCredentials ?
                                    <FormHelperText>
                                        Sorry, these credentials are invalid.
                                    </FormHelperText>
                                    : null
                            }
                        </FormControl>

                        <FormControl
                            className={classNames(classes.margin, classes.textField)}
                            error={loginAttempted && invalidCredentials}
                        >
                            <TextField
                                error={loginAttempted && invalidCredentials}
                                label="Your Password"
                                className={classes.width100}
                                id="adornment-password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => this.setState({ password: e.target.value })}
                                onFocus={this.resetInvalidFlag}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                tabIndex={-1}
                                                aria-label="Toggle password visibility"
                                                onClick={this.handleClickShowPassword}
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />

                            {loginAttempted && !password ?
                                <FormHelperText>Please enter your password</FormHelperText>
                                : invalidCredentials ?
                                    <FormHelperText>
                                        Sorry, these credentials are invalid.
                                    </FormHelperText>
                                    : null
                            }
                        </FormControl>
                        <Grid container={true} justify="space-between" alignContent="space-between">
                            <Grid item={true} className={classes.gridBtn}>
                                <Button
                                    color="secondary"
                                    className={classNames(classes.btnForgetPw, classes.loginInputField)}
                                    tabIndex={-1}
                                >
                                    <Link
                                        tabIndex={-1}
                                        to="/login/forgot-password"
                                        className={classNames(
                                            classes.btnForgetPw,
                                            classes.loginInputField,
                                            classes.fontWeight500
                                        )}
                                    >
                                        forgot Password ?
                                        <p
                                            className={classNames(
                                                classes.colorSecondary,
                                                classes.fontWeight400,
                                                classes.m_0
                                            )}>
                                            Click Here
                                        </p>
                                    </Link>
                                </Button>
                                <Button
                                    type="submit"
                                    size="large"
                                    color="primary"
                                    variant="contained"
                                    className={classes.btnLogin}
                                    disabled={isLoginPending}
                                >
                                    Log In
                                        {isLoginPending &&
                                        <CircularProgress size={24} className={classes.buttonProgress} />}
                                </Button>
                            </Grid>
                        </Grid>
                    </form>

                    {/* <SocialLogin whiteLabel=-{whiteLabel}/> */}
                </Grid>
            </Grid>
        );
    }
}

export default (withGStyles(styles)(LoginPage));
