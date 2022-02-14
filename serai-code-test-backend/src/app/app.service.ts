import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { PhoneValidationResult } from 'src/model/phoneValidation.model';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom, map, Observable } from 'rxjs';
import { EmailValidationResult } from 'src/model/emailValidation.model';

@Injectable()
export class AppService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) { }

  validatePhone(number: number): Observable<PhoneValidationResult | {}> {
    if(!number) {
      throw new HttpException('Phone number not provided', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    let baseUrl = this.configService.get('phoneValidationApi');
    let key = this.configService.get('phoneValidationApiKey');

    let url = `${baseUrl}?access_key=${key}&number=${number}&country_code=&format=1`;

    Logger.log(`called ${url}`);
    return this.httpService
      .get(url)
      .pipe(
        map((response) => response.data),
        map((data): PhoneValidationResult => ({
          valid: data.valid,
          number: data.number,
          local_format: data.local_format,
          international_format: data.international_format,
          country_prefix: data.country_prefix,
          country_code: data.country_code,
          country_name: data.country_name,
          location: data.location,
          carrier: data.carrier,
          line_type: data.line_type,
        })),
        catchError(e => {
          throw new HttpException(e.response.data, e.response.status);
        }),
      )
  }

  validateEmail(email: string): Observable<EmailValidationResult | {}> {

    if(!email) {
      throw new HttpException('Email not provided', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    let baseUrl = this.configService.get('emailValidationApi');
    let key = this.configService.get('emailValidationApiKey');

    let url = `${baseUrl}?access_key=${key}&email=${email}&smtp=1&format=1`;

    Logger.log(`called ${url}`);
    return this.httpService
      .get(url)
      .pipe(
        map((response) => response.data),
        map((data): EmailValidationResult => ({
          email: data.email,
          user: data.user,
          domain: data.domain,
          formatValid: data.format_valid,
        })),
        catchError(e => {
          throw new HttpException(e.response.data, e.response.status);
        }),
      )
  }
}
