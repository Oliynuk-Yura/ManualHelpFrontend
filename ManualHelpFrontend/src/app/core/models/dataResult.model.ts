export class Result{
  message: string;
  sucssess: boolean;
}

export class DataResult<TData>  extends Result{  
  data: TData;
}

