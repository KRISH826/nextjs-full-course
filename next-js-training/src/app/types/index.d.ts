import { ZodIssue } from "zod";

type ActionResult<T> = {status: 'success', data: T | string} | {status: 'error', error:string | ZodIssue[]};