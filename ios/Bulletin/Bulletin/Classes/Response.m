#import "Response.h"

@implementation Response
+(id) withData: (NSData*) data
{
    Response* response = [[Response alloc] init];
    NSDictionary* body = [NSJSONSerialization JSONObjectWithData:data options:0 error:nil];
    [response setResult: [body objectForKey: @"result"]];
    
    NSDictionary* status = [body objectForKey: @"status"];
    [response setStatusCode: [[status objectForKey: @"code"] intValue]];
    [response setMessage: [status objectForKey:@"message"]];
    
    return response;
}
+(id) withResult: (id) result withStatusCode: (int) statusCode
{
    Response* response = [[Response alloc] init];
    [response setResult: result];
    [response setStatusCode: statusCode];
    
    [response setMessage: [[NSString alloc] init]];
    
    return response;
}
+(id) withResult: (id) result withStatusCode: (int) statusCode withMessage: (NSString*) message
{
    Response* response = [self withResult: result withStatusCode: statusCode];
    [response setMessage: message];
    
    return response;
}
@end
