/*
 * Config
 *
 * Contains configurations that several classes will look towards
 * for certain settings that they may have.
 */

#define mustOverride() @throw [NSException exceptionWithName:NSInvalidArgumentException reason:[NSString stringWithFormat:@"%s must be overridden in a subclass/category", __PRETTY_FUNCTION__] userInfo:nil]
#define methodNotImplemented() mustOverride()

static NSString * const kEndpointAPI  = @"http://google.com";
static float const kRequestTimeout = 15.0;
