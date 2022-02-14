import { Controller, Get, HttpException, HttpStatus, Logger, Param, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('')
  welcome() {
    return 'Welcome to Serai Code Test Backend!';
  }

  @Get('/validatePhoneNumber/:number')
  validatePhoneNumber(
    @Res() response,
    @Param('number') number: number,
  ) {
    this.appService.validatePhone(number).subscribe(data => {
      return response
        .status(HttpStatus.OK)
        .json(data);
    }, (e: HttpException) => {
      return response
        .status(e.getStatus())
        .json(e);
    })
  }

  @Get('/validateEmail/:email')
  validateEmail(
    @Res() response,
    @Param('email') email: string,
  ) {
    this.appService.validateEmail(email).subscribe(data => {
      return response
        .status(HttpStatus.OK)
        .json(data);
    }, (e: HttpException) => {
      return response
        .status(e.getStatus())
        .json(e);
    })
  }
}
