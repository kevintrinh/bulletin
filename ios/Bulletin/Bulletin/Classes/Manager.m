#import "Manager.h"
#import "Config.h"

@implementation Manager
+(id) sharedInstance
{
    static Manager *sharedManager = nil;
    if (sharedManager == nil) {
        sharedManager = [[Manager alloc] init];
    }
    return sharedManager;
}
-(NSURL*) getURLFromEndpoint: (NSString*) endpoint
{
    return [NSURL URLWithString: [NSString stringWithFormat:@"%@/%@", kEndpointAPI, endpoint]];
}
-(NSMutableURLRequest*) prepareUrlRequest: (Request*) request
{
    NSURL* endpoint = [self getURLFromEndpoint: [request endpoint]];
    NSMutableURLRequest *urlRequest = [NSMutableURLRequest requestWithURL: endpoint cachePolicy: NSURLRequestReloadIgnoringLocalAndRemoteCacheData timeoutInterval: kRequestTimeout];
    [urlRequest setHTTPMethod: [request method]];
    [urlRequest setHTTPBody: [request body]];
    
    return urlRequest;
}

/*
 * handleCall: (Request*) request
 * This will perform a request. However, it will
 * not return a response as we do not specify a
 * callback to receive the response.
 * 
 * This is mostly used to fire and forget.
 *
 * @param Request request  the request to be sent.
 * @return void
 */
-(void) handleCall: (Request*) request
{
    NSMutableURLRequest* urlRequest = [self prepareUrlRequest: request];
    [NSURLConnection sendAsynchronousRequest:urlRequest queue:[NSOperationQueue mainQueue] completionHandler: nil];
}

/*
 * handleCall: (Request*) request (void (^)(Response* response)) completion
 * This will perform a request. When it is complete
 * The function will call the completion handler
 * with the response received from the call.
 
 * @param Request request  the request to be sent.
 * @return void
 */
-(void) handleCall: (Request*) request withCompletion: (void (^)(Response* response)) completion
{
    NSMutableURLRequest* urlRequest = [self prepareUrlRequest: request];
    
    [NSURLConnection sendAsynchronousRequest:urlRequest queue:[NSOperationQueue mainQueue] completionHandler: ^(NSURLResponse *urlResponse, NSData* data, NSError* error){
        if (!error) {
            Response *response = [Response withData: data];
            completion(response);
        }
    }];
}

/*
 * logout
 * This will invalidate the token.
 */
-(void) invalidate
{
    if (self.authenticated) {
        [self setAuthenticated: false];
        [self setToken: [[NSString alloc] init]];
    }
}

@end
