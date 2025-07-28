import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Activity, 
  Cpu, 
  HardDrive, 
  Wifi, 
  Clock,
  Zap,
  TrendingUp,
  AlertTriangle,
  CheckCircle
} from "lucide-react";

interface PerformanceMetric {
  name: string;
  value: number;
  unit: string;
  status: 'good' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
}

interface BuildMetrics {
  buildTime: number;
  bundleSize: number;
  chunks: number;
  errors: number;
  warnings: number;
}

export default function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetric[]>([
    { name: 'CPU Usage', value: 45, unit: '%', status: 'good', trend: 'stable' },
    { name: 'Memory', value: 2.1, unit: 'GB', status: 'good', trend: 'up' },
    { name: 'Disk Usage', value: 78, unit: '%', status: 'warning', trend: 'up' },
    { name: 'Network', value: 12.5, unit: 'MB/s', status: 'good', trend: 'down' },
  ]);

  const [buildMetrics, setBuildMetrics] = useState<BuildMetrics>({
    buildTime: 2.3,
    bundleSize: 1.2,
    chunks: 8,
    errors: 0,
    warnings: 3
  });

  const [realtimeStats, setRealtimeStats] = useState({
    fps: 60,
    responseTime: 45,
    requestsPerSecond: 120,
    errorRate: 0.2
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => prev.map(metric => ({
        ...metric,
        value: Math.max(0, metric.value + (Math.random() - 0.5) * 10),
        trend: Math.random() > 0.5 ? 'up' : 'down'
      })));

      setRealtimeStats(prev => ({
        ...prev,
        fps: Math.max(30, Math.min(60, prev.fps + (Math.random() - 0.5) * 5)),
        responseTime: Math.max(10, prev.responseTime + (Math.random() - 0.5) * 10),
        requestsPerSecond: Math.max(50, prev.requestsPerSecond + (Math.random() - 0.5) * 20),
        errorRate: Math.max(0, Math.min(5, prev.errorRate + (Math.random() - 0.5) * 0.5))
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-500';
      case 'warning': return 'text-yellow-500';
      case 'critical': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'critical': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default: return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-3 w-3 text-red-400" />;
      case 'down': return <TrendingUp className="h-3 w-3 text-green-400 rotate-180" />;
      case 'stable': return <div className="h-3 w-3 rounded-full bg-gray-400" />;
      default: return null;
    }
  };

  return (
    <div className="w-80 bg-card border-l dyad-border flex flex-col max-h-screen">
      {/* Header */}
      <div className="p-4 border-b dyad-border">
        <div className="flex items-center space-x-2">
          <Activity className="h-5 w-5 text-primary" />
          <h2 className="font-semibold dyad-text">Performance Monitor</h2>
          <Badge variant="outline" className="text-xs animate-pulse">
            Live
          </Badge>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-4">
        {/* System Metrics */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm dyad-text flex items-center space-x-2">
              <Cpu className="h-4 w-4" />
              <span>System Resources</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-3">
            {metrics.map((metric, index) => (
              <div key={index} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(metric.status)}
                    <span className="dyad-text">{metric.name}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className={`font-medium ${getStatusColor(metric.status)}`}>
                      {metric.value.toFixed(1)}{metric.unit}
                    </span>
                    {getTrendIcon(metric.trend)}
                  </div>
                </div>
                <Progress value={Math.min(100, metric.value)} className="h-1" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Build Performance */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm dyad-text flex items-center space-x-2">
              <Zap className="h-4 w-4" />
              <span>Build Performance</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-3">
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="space-y-1">
                <div className="dyad-text-muted">Build Time</div>
                <div className="dyad-text font-medium">
                  {buildMetrics.buildTime}s
                </div>
              </div>
              <div className="space-y-1">
                <div className="dyad-text-muted">Bundle Size</div>
                <div className="dyad-text font-medium">
                  {buildMetrics.bundleSize}MB
                </div>
              </div>
              <div className="space-y-1">
                <div className="dyad-text-muted">Chunks</div>
                <div className="dyad-text font-medium">
                  {buildMetrics.chunks}
                </div>
              </div>
              <div className="space-y-1">
                <div className="dyad-text-muted">Errors</div>
                <div className={`font-medium ${buildMetrics.errors > 0 ? 'text-red-500' : 'text-green-500'}`}>
                  {buildMetrics.errors}
                </div>
              </div>
            </div>
            
            {buildMetrics.warnings > 0 && (
              <div className="flex items-center space-x-2 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded text-xs">
                <AlertTriangle className="h-3 w-3 text-yellow-500" />
                <span className="dyad-text">{buildMetrics.warnings} warnings found</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Real-time Performance */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm dyad-text flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>Runtime Performance</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="dyad-text-muted">Frame Rate</span>
                <span className={`font-medium ${realtimeStats.fps >= 55 ? 'text-green-500' : realtimeStats.fps >= 30 ? 'text-yellow-500' : 'text-red-500'}`}>
                  {Math.round(realtimeStats.fps)} FPS
                </span>
              </div>
              <Progress value={(realtimeStats.fps / 60) * 100} className="h-1" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="dyad-text-muted">Response Time</span>
                <span className={`font-medium ${realtimeStats.responseTime <= 50 ? 'text-green-500' : realtimeStats.responseTime <= 100 ? 'text-yellow-500' : 'text-red-500'}`}>
                  {Math.round(realtimeStats.responseTime)}ms
                </span>
              </div>
              <Progress value={Math.min(100, (200 - realtimeStats.responseTime) / 2)} className="h-1" />
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="space-y-1">
                <div className="dyad-text-muted">Requests/sec</div>
                <div className="dyad-text font-medium">
                  {Math.round(realtimeStats.requestsPerSecond)}
                </div>
              </div>
              <div className="space-y-1">
                <div className="dyad-text-muted">Error Rate</div>
                <div className={`font-medium ${realtimeStats.errorRate <= 1 ? 'text-green-500' : realtimeStats.errorRate <= 3 ? 'text-yellow-500' : 'text-red-500'}`}>
                  {realtimeStats.errorRate.toFixed(1)}%
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Code Quality Metrics */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm dyad-text flex items-center space-x-2">
              <HardDrive className="h-4 w-4" />
              <span>Code Quality</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-3">
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="space-y-1">
                <div className="dyad-text-muted">Test Coverage</div>
                <div className="flex items-center space-x-2">
                  <div className="dyad-text font-medium">87%</div>
                  <CheckCircle className="h-3 w-3 text-green-500" />
                </div>
              </div>
              <div className="space-y-1">
                <div className="dyad-text-muted">Code Quality</div>
                <div className="flex items-center space-x-2">
                  <div className="dyad-text font-medium">A</div>
                  <CheckCircle className="h-3 w-3 text-green-500" />
                </div>
              </div>
              <div className="space-y-1">
                <div className="dyad-text-muted">Complexity</div>
                <div className="flex items-center space-x-2">
                  <div className="dyad-text font-medium">3.2</div>
                  <AlertTriangle className="h-3 w-3 text-yellow-500" />
                </div>
              </div>
              <div className="space-y-1">
                <div className="dyad-text-muted">Duplicates</div>
                <div className="flex items-center space-x-2">
                  <div className="dyad-text font-medium">2.1%</div>
                  <CheckCircle className="h-3 w-3 text-green-500" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}