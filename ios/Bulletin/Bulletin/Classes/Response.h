#import <Foundation/Foundation.h>

@interface Response : NSObject
+(id) withData: (NSData*) data;
+(id) withResult: (id) result withStatusCode: (int) statusCode;
+(id) withResult: (id) result withStatusCode: (int) statusCode withMessage: (NSString*) message;

@property id result;
@property int statusCode;
@property NSString * message;
@end
