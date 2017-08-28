#import "ViewController.h"
#import "Manager.h"
@interface ViewController ()
@property (nonatomic, retain) Manager * manager;
@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view, typically from a nib.
    self.manager = [Manager sharedInstance];
    
    NSString* email    = @"kevintrinh255@gmail.com";
    NSString* password = @"hellokevin";
    
    NSDictionary* bodyParameters = [[NSDictionary alloc] init];
    [bodyParameters setValue: email forKey: @"email"];
    [bodyParameters setValue: password forKey: @"password"];
    
    Request *request = [Request withEndpoint: @"/register/newuser" withMethod: @"POST" withBodyParameters: bodyParameters];
    [self.manager handleCall:request withCompletion: ^(Response * response) {
        int statusCode = [response statusCode];
        if (statusCode == 200) {
            [self.manager setEmail: email];
        } else if (statusCode == 100) {
            // Email already exists
        } else if (statusCode == 101) {
            // Invalid email format
        }
    }];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}


@end
