
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, Check, CheckCircle, Clock, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FormEvent } from 'react';
import { ByteArray, type Hex, parseEther } from 'viem';
import { type BaseError, useSendTransaction, useWaitForTransactionReceipt } from 'wagmi';
import { toast } from 'sonner';
import { Account } from '@/components/Account';
import Connect from '@/components/Connect';
import { useAccount } from 'wagmi';
// import { useUser } from '@civic/auth-web3/react';
// import { userHasWallet } from '@civic/auth-web3';


const PricingTabs: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  // useAutoConnect();
    const { data: hash, error, isPending, sendTransaction } = useSendTransaction()
    const [address, setAddress] = useState('')
    const [value, setValue] = useState('')
    const { isLoading: isConfirming, isSuccess: isConfirmed } =
      useWaitForTransactionReceipt({
        hash,
      })
    const [notification, setNotification] = useState(false);
      const { isConnected } = useAccount();

  async function submit(e: FormEvent<HTMLFormElement>) {
    try {
    e.preventDefault()
    const to = address as Hex
    const money = value as string
    sendTransaction({ to, value: parseEther(money) });

    } catch (e) {
      console.error(e)
      toast.error(`Transaction failed. ${(e as BaseError).shortMessage || (e as Error).message}`, {
        position: 'top-right',
        duration: 10000,
      })
    }
  }

  useEffect(() => {
    if (hash || isConfirming || isConfirmed || error) {
      setNotification(true);
      
    }
    
  }, [hash, isConfirming, isConfirmed, error]);





  const plans = [
    {
      name: 'Free',
      description: 'Basic access to AI symptom analysis.',
      price: { monthly: 0, yearly: 0 },
      features: [
        'Symptom analysis with AI',
        'Basic medical image analysis',
        'Save up to 3 analyses',
        'Access to health articles',
      ],
      limitations: [
        'No doctor consultations',
        'Limited AI analyses per month',
        'No priority support',
      ],
      ctaText: 'Get Started',
      popular: false,
      color: 'bg-muted',
    },
    {
      name: 'Premium',
      description: 'Perfect for regular health monitoring.',
      price: { monthly: 0.2, yearly: 0.10 },
      features: [
        'Everything in Free plan',
        'Unlimited symptom analyses',
        'Detailed medical image reviews',
        'Save unlimited analyses',
        'Priority AI processing',
        '2 virtual doctor consultations',
        'Email support',
      ],
      limitations: [],
      ctaText: 'Upgrade Now',
      popular: true,
      color: 'bg-genz-gradient',
    },
    {
      name: 'Family',
      description: 'Health coverage for the whole family.',
      price: { monthly: 0.35, yearly: 399.99 },
      features: [
        'Everything in Premium plan',
        'Up to 5 family profiles',
        'Shared health history',
        '5 virtual doctor consultations',
        'Family health tracking',
        '24/7 priority support',
        'Quarterly health reports',
      ],
      limitations: [],
      ctaText: 'Choose Family Plan',
      popular: false,
      color: 'bg-muted',
    },
  ];

  const getDiscountPercentage = (monthlyPrice: number, yearlyPrice: number) => {
    if (monthlyPrice === 0) return 0;
    const yearlyEquivalentMonthly = yearlyPrice / 12;
    const savingsPercentage = ((monthlyPrice - yearlyEquivalentMonthly) / monthlyPrice) * 100;
    return Math.round(savingsPercentage);
  };

  return (
    <div className="genz-container py-12 relative">
       {/* Transaction Notification Banner */}
      {(hash || isConfirming || isConfirmed || error) && notification && (
        <div className="mb-6 mx-auto max-w-4xl">
          <div className={`px-4 py-3 rounded-lg shadow-sm flex items-center gap-3 transition-all ${
            isConfirmed 
              ? 'bg-green-50 border border-green-200' 
              : error 
              ? 'bg-red-50 border border-red-200' 
              : 'bg-blue-50 border border-blue-200'
          }`}>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0 hover:bg-red-500 hover:text-white" 
              onClick={() => {
                // Here you could add some state to dismiss the notification
                // This is just a placeholder for UX improvement
                console.log("Notification dismissed");
                setNotification(false);
              }}
            >
              <span className="sr-only ">Dismiss</span>
              <X className="h-4 w-4" />
            </Button>
            {isConfirmed && <CheckCircle className="h-5 w-5 text-green-600" />}
            {error && <AlertCircle className="h-5 w-5 text-red-600" />}
            {isConfirming && <Clock className="h-5 w-5 text-blue-600 animate-pulse" />}
            {hash && !isConfirming && !isConfirmed && !error && <Clock className="h-5 w-5 text-blue-600" />}
            
            <div className="flex-1">
              {hash && (
                <p className="text-sm font-medium">
                  Transaction Hash: <span className="font-mono text-xs break-all">{hash}</span>
                </p>
              )}
              {isConfirming && (
                <p className="text-sm font-medium text-blue-800">Waiting for confirmation...</p>
              )}
              {isConfirmed && (
                <p className="text-sm font-medium text-green-800">Transaction confirmed successfully!</p>
              )}
              {error && (
                <p className="text-sm font-medium text-red-800">
                  Error: {(error as BaseError).shortMessage || error.message}
                </p>
              )}
            </div>
            
      
          </div>
        </div>
      )}
      <div className="mb-12 text-center">
        
    
        
        <h1 className="mb-3 text-3xl font-bold md:text-4xl">Choose Your Plan</h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Select the plan that best fits your health needs.
        </p>
      </div>
      
      <div className="mb-10 flex justify-center">
        <Tabs 
          defaultValue="monthly" 
          value={billingCycle}
          onValueChange={(value) => setBillingCycle(value as 'monthly' | 'yearly')}
          className="w-full max-w-md"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="yearly">
              Yearly
              <span className="ml-2 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                Save 16%
              </span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {plans.map((plan, idx) => {
          const price = billingCycle === 'monthly' ? plan.price.monthly : plan.price.yearly;
          const discount = getDiscountPercentage(plan.price.monthly, plan.price.yearly);
          
          return (
            <Card 
              key={idx} 
              className={`relative overflow-hidden ${plan.popular ? 'border-primary shadow-lg ring-2 ring-primary' : ''}`}
            >
              {plan.popular && (
                <div className="absolute right-0 top-0">
                  <div className="bg-primary px-3 py-1 text-xs font-semibold text-white">
                    Most Popular
                  </div>
                </div>
              )}
              
              <CardHeader className={`${plan.color} text-black/90`}>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription className={plan.popular ? 'text-white/90' : 'text-muted-foreground'}>
                  {plan.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="p-6">
                <div className="mb-4">
                  <span className="text-3xl font-bold">
                    {price === 0 ? 'Free' : `Ξ${price.toFixed(2)} eth`}
                  </span>
                  <span className="text-muted-foreground">
                    {price !== 0 && `/${billingCycle === 'monthly' ? 'month' : 'year'}`}
                  </span>
                  {billingCycle === 'yearly' && price !== 0 && discount > 0 && (
                    <span className="ml-2 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                      Save {discount}%
                    </span>
                  )}
                </div>
                
                <div className="mb-6 space-y-4">
                  <h4 className="font-medium">What's included:</h4>
                  <ul className="space-y-2">
                    {plan.features.map((feature, featureIdx) => (
                      <li key={featureIdx} className="flex items-start gap-2">
                        <Check className="h-5 w-5 flex-shrink-0 text-green-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {plan.limitations.length > 0 && (
                    <>
                      <h4 className="font-medium">Limitations:</h4>
                      <ul className="space-y-2">
                        {plan.limitations.map((limitation, limitIdx) => (
                          <li key={limitIdx} className="flex items-start gap-2 text-muted-foreground">
                            <span className="text-muted-foreground">•</span>
                            <span>{limitation}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </CardContent>
              
              <CardFooter className="pb-6">
                 <Dialog>
                <DialogTrigger asChild>
                <Button 
                  className={`w-full ${plan.popular ? 'bg-genz-gradient' : ''} ${price === 0 ? 'cursor-not-allowed' : ''}`}
                  variant={plan.popular ? 'default' : 'outline'}
                  disabled={price === 0}
                >
                  {plan.ctaText}
                </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Pay for Premium</DialogTitle>
          <DialogDescription>
            Make payment for the Premium plan. You will be charged Ξ{price.toFixed(2)} eth {billingCycle === 'monthly' ? 'monthly' : 'yearly'}.
          </DialogDescription>
             {isConnected ? <Account /> : <Connect />}
        </DialogHeader>
          <form className="set" onSubmit={submit}>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right" >
              Address
            </Label>
            <Input id="name" placeholder='Enter receipient wallet address' className="col-span-3 mb-2"  required  onChange={(e) => setAddress(e.target.value)} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right" >
              Amount(ETH)
            </Label>
            <Input name="value" disabled value={price.toFixed(2)} placeholder='Enter amount in ETH' className="col-span-3" type="number" step="0.000000001" required onChange={(e) => setValue(e.target.value)} />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" disabled={isPending}>
            {isPending ? 'Processing...' : 'Pay'}
          </Button>
        </DialogFooter>
        </form>
        
        
      </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          );
        })}
      </div>
      
      <div className="mt-16">
        <div className="mx-auto max-w-3xl rounded-xl border p-8">
          <h2 className="mb-4 text-center text-2xl font-bold">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="mb-2 text-lg font-medium">Can I cancel my subscription at any time?</h3>
              <p className="text-muted-foreground">
                Yes, you can cancel your subscription at any time. If you cancel, you'll still have access to your plan until the end of your billing period.
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-medium">How does the doctor consultation work?</h3>
              <p className="text-muted-foreground">
                Premium and Family plan members can schedule virtual consultations with licensed medical doctors through our platform. You'll receive a video call link at your scheduled time.
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-medium">Is my medical data private and secure?</h3>
              <p className="text-muted-foreground">
                Yes, we take your privacy seriously. All your medical data is encrypted and stored securely. We comply with all relevant health data privacy regulations.
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-medium">Can I upgrade or downgrade my plan later?</h3>
              <p className="text-muted-foreground">
                Yes, you can upgrade or downgrade your plan at any time. If you upgrade, you'll be charged the prorated difference. If you downgrade, the new rate will apply at the start of your next billing cycle.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingTabs;
