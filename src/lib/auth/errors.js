import { CredentialsSignin } from 'next-auth';

export class CouldNotParseError extends CredentialsSignin {}

export class MemberNotFoundError extends CredentialsSignin {}

export class InvalidCredentialsError extends CredentialsSignin {}

export class MemberAlreadyExistsError extends CredentialsSignin {}
