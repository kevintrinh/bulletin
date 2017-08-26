#import "Request.h"

@implementation Request
+(id) withEndpoint: (NSString*) endpoint withMethod: (NSString*) method
{
    Request* request = [[Request alloc] init];
    [request setEndpoint: endpoint];
    [request setMethod: method];
    
    return request;
}
+(id) withEndpoint: (NSString*) endpoint withMethod: (NSString*) method withQueryParameters: (NSDictionary*) queryParameters
{
    Request *request = [self withEndpoint: endpoint withMethod: method];
    [request setQueryParameters: queryParameters];
    
    return request;
}
+(id) withEndpoint: (NSString*) endpoint withMethod: (NSString*) method withBody: (NSData*) body
{
    Request *request = [self withEndpoint: endpoint withMethod: method];
    [request setBody: body];
    
    return request;
}
+(id) withEndpoint: (NSString*) endpoint withMethod: (NSString*) method withBodyParameters: (NSDictionary*) bodyParameters
{
    Request *request = [self withEndpoint: endpoint withMethod: method];
    [request setBodyParameters: bodyParameters];
    
    return request;
}

+(id) withEndpoint: (NSString*) endpoint withMethod: (NSString*) method withHeaders:(NSDictionary*) headers
{
    Request *request = [self withEndpoint: endpoint withMethod: method];
    [request setHeaders: headers];
    
    return request;
}
+(id) withEndpoint: (NSString*) endpoint withMethod: (NSString*) method withQueryParameters: (NSDictionary*) queryParameters withHeaders:(NSDictionary*) headers
{
    Request *request = [self withEndpoint: endpoint withMethod: method withQueryParameters: queryParameters];
    [request setHeaders: headers];
    
    return request;
}

+(id) withEndpoint: (NSString*) endpoint withMethod: (NSString*) method withBody: (NSData*) body withHeaders:(NSDictionary*) headers
{
    Request *request = [self withEndpoint: endpoint withMethod: method withBody: body];
    [request setHeaders: headers];
    
    return request;
}
+(id) withEndpoint: (NSString*) endpoint withMethod: (NSString*) method withBodyParameters: (NSDictionary*) bodyParameters withHeaders:(NSDictionary*) headers
{
    Request *request = [self withEndpoint: endpoint withMethod: method withBodyParameters: bodyParameters];
    [request setHeaders: headers];
    
    return request;
}
@end
