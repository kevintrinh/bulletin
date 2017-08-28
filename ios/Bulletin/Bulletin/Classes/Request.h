#import <Foundation/Foundation.h>

@interface Request : NSObject
+(id) withEndpoint: (NSString*) endpoint withMethod: (NSString*) method;
+(id) withEndpoint: (NSString*) endpoint withMethod: (NSString*) method withQueryParameters: (NSDictionary*) queryParameters;
+(id) withEndpoint: (NSString*) endpoint withMethod: (NSString*) method withBody: (NSData*) body;
+(id) withEndpoint: (NSString*) endpoint withMethod: (NSString*) method withBodyParameters: (NSDictionary*) bodyParameters;

+(id) withEndpoint: (NSString*) endpoint withMethod: (NSString*) method withHeaders:(NSDictionary*) headers;
+(id) withEndpoint: (NSString*) endpoint withMethod: (NSString*) method withQueryParameters: (NSDictionary*) queryParameters withHeaders:(NSDictionary*) headers;
+(id) withEndpoint: (NSString*) endpoint withMethod: (NSString*) method withBody: (NSData*) body withHeaders:(NSDictionary*) headers;
+(id) withEndpoint: (NSString*) endpoint withMethod: (NSString*) method withBodyParameters: (NSDictionary*) bodyParameters withHeaders:(NSDictionary*) headers;

@property NSString* endpoint;
@property NSString* method;
@property NSDictionary* queryParameters;
@property NSDictionary* bodyParameters;
@property NSData* body;
@property NSDictionary* headers;
@end
