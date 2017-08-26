#import <Foundation/Foundation.h>
#import "Request.h"
#import "Response.h"

@interface Manager : NSObject
+(id) sharedInstance;
-(void) handleCall: (Request*) request;
-(void) handleCall: (Request*) request withCompletion: (void (^)(Response* response)) completion;
-(void) invalidate;

@property BOOL authenticated;
@property NSString* token;
@property NSString* email;

@end
